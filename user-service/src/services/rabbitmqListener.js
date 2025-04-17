const amqp = require('amqplib');

class RabbitMQListener {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.isListening = false;
    this.queueName = 'user_service_chat_events';
  }

  async start() {
    if (this.isListening) return;

    try {
      // 1. Conectarse a RabbitMQ
      this.connection = await amqp.connect('amqp://guest:guest@localhost');
      this.channel = await this.connection.createChannel();

      // 2. Declarar el exchange (debe coincidir con el del chat-service)
      await this.channel.assertExchange('chat_events', 'topic', { durable: true });

      // 3. Crear una cola DURABLE con nombre específico
      await this.channel.assertQueue(this.queueName, { durable: true });

      // 4. Enlazar la cola al exchange para eventos de chat creado
      await this.channel.bindQueue(this.queueName, 'chat_events', 'chat.created');

      console.log('🔄 User Service esperando eventos de chat...');

      // 5. Configurar el consumidor con prefetch 1
      await this.channel.prefetch(1);
      this.channel.consume(this.queueName, (message) => {
        if (message) {
          try {
            const content = JSON.parse(message.content.toString());
            console.log('📬 Evento recibido - Chat creado:');
            console.log('   ID del chat:', content.chatId);
            console.log('   Participantes:', content.participants.join(' y '));
            console.log('   Timestamp:', content.timestamp);
            console.log('-----------------------------------');
            
            // Confirmar recepción del mensaje
            this.channel.ack(message);
          } catch (error) {
            console.error('Error procesando mensaje:', error);
          }
        }
      });

      this.isListening = true;

      // Manejar cierre de conexión
      this.connection.on('close', () => {
        console.log('Conexión RabbitMQ cerrada');
        this.isListening = false;
      });

    } catch (error) {
      console.error('❌ Error en RabbitMQ listener:', error.message);
      this.isListening = false;
    }
  }

  async close() {
    try {
      if (this.channel) {
        await this.channel.close();
        this.channel = null;
      }
      if (this.connection) {
        await this.connection.close();
        this.connection = null;
      }
      this.isListening = false;
      console.log('✅ Conexión RabbitMQ cerrada correctamente');
    } catch (error) {
      console.error('❌ Error al cerrar conexión RabbitMQ:', error.message);
    }
  }
}

// Singleton para evitar múltiples instancias
const listener = new RabbitMQListener();

// Iniciar automáticamente al importar
listener.start().catch(console.error);

// Manejar cierre de la aplicación
process.on('exit', () => listener.close());
process.on('SIGINT', () => listener.close());

module.exports = { listener };