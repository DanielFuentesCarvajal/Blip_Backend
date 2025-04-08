const amqp = require('amqplib');

let connection;
let channel;
let isConsumerSetup = false; // Bandera para controlar el consumidor

const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect('amqp://guest:guest@localhost');
    channel = await connection.createChannel();
    
    await channel.assertExchange('chat_events', 'topic', { durable: true });
    console.log('✅ Connected to RabbitMQ');

    // Configurar consumidor solo una vez
    if (!isConsumerSetup) {
      const queue = await channel.assertQueue('', { exclusive: true });
      await channel.bindQueue(queue.queue, 'chat_events', '#');
      
      channel.consume(queue.queue, (msg) => {
        if (msg.content) {
          console.log('📩 Received RabbitMQ event:', {
            routingKey: msg.fields.routingKey,
            content: msg.content.toString()
          });
        }
      }, { noAck: true });

      isConsumerSetup = true;
    }
    
    return channel;
  } catch (error) {
    console.error('❌ Error connecting to RabbitMQ:', error.message);
    throw error;
  }
};

const getChannel = () => {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  return channel;
};

// Cerrar conexión al terminar
process.on('exit', () => {
  if (connection) connection.close();
});

module.exports = { connectRabbitMQ, getChannel };