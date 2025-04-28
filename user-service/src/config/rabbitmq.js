const amqp = require('amqplib');

let connection;
let channel;
let isClosing = false;

const connectRabbitMQ = async () => {
    if (channel) return channel;
    
    try {
      connection = await amqp.connect('amqp://guest:guest@localhost');
      channel = await connection.createChannel();
      
      await channel.assertExchange('chat_events', 'topic', { durable: true });
      await channel.assertExchange('chat_events_dlx', 'topic', { durable: true });
      
      console.log('✅ RabbitMQ configurado para user-service');
      return channel;
    } catch (error) {
      console.error('❌ Error configurando RabbitMQ:', error);
      throw error;
    }
};

const getChannel = () => {
  if (!channel || isClosing) throw new Error('Canal RabbitMQ no disponible');
  return channel;
};

const closeConnection = async () => {
  if (isClosing || !connection) return;
  isClosing = true;
  
  try {
    // No cerrar el canal aquí, dejar que el listener lo maneje
    if (connection) {
      await connection.close();
      console.log('✅ Conexión RabbitMQ cerrada correctamente');
    }
  } catch (error) {
    console.error('❌ Error al cerrar conexión RabbitMQ:', error.message);
    throw error;
  } finally {
    channel = null;
    connection = null;
    isClosing = false;
  }
};

module.exports = { connectRabbitMQ, getChannel, closeConnection };