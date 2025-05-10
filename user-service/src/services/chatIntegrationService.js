const { promisePool } = require('../config/db');
const { getChannel } = require('../config/rabbitmq');

class ChatIntegrationService {
  constructor() {
    this.pendingChats = new Map();
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;
    
    try {
      await this.setupConsumer();
      await this.setupDLQConsumer();
      this.initialized = true;
    } catch (error) {
      console.error('Error inicializando ChatIntegrationService:', error);
      throw error;
    }
  }

  async setupConsumer() {
    const channel = await getChannel();
    
    const { queue } = await channel.assertQueue('user_service.chats', {
      durable: true,
      arguments: {
        'x-dead-letter-exchange': 'chat_events_dlx',
        'x-message-ttl': 10000
      }
    });

    await channel.bindQueue(queue, 'chat_events', 'chat.created');
    await channel.prefetch(5);

    // Usamos arrow function para mantener el contexto
    channel.consume(queue, async (msg) => {
      if (!msg) return;

      try {
        const event = JSON.parse(msg.content.toString());
        await this._processChatCreation(event); // Ahora usa el método interno
        channel.ack(msg);
      } catch (error) {
        console.error('Chat processing error:', error);
        channel.nack(msg, false, false);
      }
    });
  }

  async setupDLQConsumer() {
    const channel = await getChannel();
    
    const dlq = await channel.assertQueue('user_service.chats.dlq', { durable: true });
    await channel.bindQueue(dlq.queue, 'chat_events_dlx', '#');

    channel.consume(dlq.queue, (msg) => {
      const event = JSON.parse(msg.content.toString());
      console.error('❌ Dead Letter Message:', event);
      channel.ack(msg);
    });
  }

  async _processChatCreation(event) {
    const { chatId, participants } = event;
    const sortedParticipants = [...participants].sort((a, b) => a - b);
    
    try {
      // Verificación inicial fuera de la transacción
      const [existingChat] = await promisePool.query(
        'SELECT chat_id FROM user_chats WHERE chat_id = ?',
        [chatId]
      );

      if (existingChat.length > 0) {
        console.log(`Chat ${chatId} ya existe, enviando confirmación`);
        await this.publishConfirmation(chatId, true);
        return;
      }
      await promisePool.query('SELECT 1'); // ping para asegurar conexión viva
      await promisePool.query('START TRANSACTION');
      
      // Verificación de usuarios con LOCK
      let user1, user2;
      try {
        [user1] = await promisePool.query(
          'SELECT idusers FROM users WHERE idusers = ? FOR UPDATE', 
          [sortedParticipants[0]]
        );
      } catch (e) {
        console.error('❌ Error al consultar user1:', e);
        throw e;
      }
      
      try {
        [user2] = await promisePool.query(
          'SELECT idusers FROM users WHERE idusers = ? FOR UPDATE', 
          [sortedParticipants[1]]
        );
      } catch (e) {
        console.error('❌ Error al consultar user2:', e);
        throw e;
      }
      
      
      
      if (!user1.length || !user2.length) {
        throw new Error(`Usuarios no encontrados: ${sortedParticipants.join(', ')}`);
      }

      // Verificación final de chat existente dentro de la transacción
      const [existingChatInTx] = await promisePool.query(
        'SELECT chat_id FROM user_chats WHERE chat_id = ? FOR UPDATE',
        [chatId]
      );

      if (existingChatInTx.length > 0) {
        await promisePool.query('COMMIT');
        console.log(`Chat ${chatId} existe (verificación en tx), enviando confirmación`);
        await this.publishConfirmation(chatId, true);
        return;
      }
      
      // Inserción segura
      await promisePool.query(
        'INSERT INTO user_chats (chat_id, user1_id, user2_id) VALUES (?, ?, ?)',
        [chatId, sortedParticipants[0], sortedParticipants[1]]
      );
      
      await promisePool.query('COMMIT');
      await this.publishConfirmation(chatId, true);
      console.log(`Chat ${chatId} creado exitosamente`);
    } catch (error) {
      await promisePool.query('ROLLBACK');
      
      if (error.code === 'ER_DUP_ENTRY') {
        // Si llega aquí, es una condición de carrera muy específica
        console.warn(`Condición de carrera detectada para chat ${chatId}`);
        await this.publishConfirmation(chatId, true);
        return;
      }
      
      const errorMsg = error.code === 'ER_DUP_ENTRY' 
        ? 'El chat ya existe en la base de datos' 
        : error.message;
      
      await this.publishConfirmation(chatId, false, errorMsg);
      console.error(`Error procesando chat ${chatId}:`, error);
    }
  }

  async publishConfirmation(chatId, success, errorMessage = '') {
    const channel = await getChannel();
    const routingKey = success ? 'chat.confirmed' : 'chat.failed';
    
    await channel.publish(
      'chat_events',
      routingKey,
      Buffer.from(JSON.stringify({
        chatId,
        success,
        timestamp: new Date(),
        ...(!success && { error: errorMessage })
      })),
      { persistent: true }
    );
  }
}

module.exports = new ChatIntegrationService(); // Exportamos una instancia ya creada