const { getChannel } = require('../config/rabbitmq');
const chatIntegrationService = require('./chatIntegrationService');

class RabbitMQListener {
  constructor() {
    this.isListening = false;
    this.queueName = 'user_service_chat_events';
    this.channel = null;
    this.closing = false;
  }

  async start() {
    if (this.isListening) return;

    try {
      await chatIntegrationService.initialize(); // Inicializamos el servicio primero
      this.channel = await getChannel();
    
      await this.channel.assertQueue(this.queueName, { durable: true });
      await this.channel.bindQueue(this.queueName, 'chat_events', 'chat.created');
      
      console.log('🔄 User Service esperando eventos de chat...');
      
      await this.channel.prefetch(1);
      this.channel.consume(this.queueName, async (message) => {
        if (message) {
          try {
            const content = JSON.parse(message.content.toString());
            console.log('📬 Evento recibido - Chat creado:', content.chatId);
            
            await chatIntegrationService._processChatCreation(content);
            this.channel.ack(message);
          } catch (error) {
            console.error('Error procesando mensaje:', error);
            this.channel.nack(message, false, false);
          }
        }
      });

      this.isListening = true;
    } catch (error) {
      console.error('❌ Error en RabbitMQ listener:', error);
      throw error;
    }
  }

  async close() {
    if (this.closing || !this.isListening) return;
    this.closing = true;
    
    try {
      if (this.channel) {
        try {
          await this.channel.cancel(this.queueName);
          await this.channel.close();
          console.log('✅ Canal del listener cerrado correctamente');
        } catch (err) {
          if (err.message !== 'Channel closed') {
            console.warn('⚠️ Error al cerrar canal:', err.message);
          }
        }
        this.channel = null;
      }
    } catch (error) {
      console.error('❌ Error al cerrar listener:', error.message);
      throw error;
    } finally {
      this.closing = false;
      this.isListening = false;
    }
  }
}

module.exports = RabbitMQListener;