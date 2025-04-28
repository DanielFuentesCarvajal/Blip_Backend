// chat-service/src/config/rabbitmq.js
const amqp = require('amqplib');

let connection;
let channel;
let confirmationHandler = null; // Handler para confirmaciones

const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect('amqp://guest:guest@localhost');
    channel = await connection.createChannel();
    
    await channel.assertExchange('chat_events', 'topic', { durable: true });
    
    const { queue } = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(queue, 'chat_events', 'chat.confirmed');
    await channel.bindQueue(queue, 'chat_events', 'chat.failed');
    
    channel.consume(queue, (msg) => {
      if (msg && confirmationHandler) {
        try {
          const content = JSON.parse(msg.content.toString());
          confirmationHandler(
            content.chatId,
            msg.fields.routingKey === 'chat.confirmed',
            content.error || ''
          );
          channel.ack(msg);
        } catch (error) {
          console.error('Error processing confirmation:', error);
        }
      }
    });
    
    console.log('✅ RabbitMQ connected and listening for confirmations');
    return channel;
  } catch (error) {
    console.error('❌ RabbitMQ connection error:', error);
    throw error;
  }
};

const registerConfirmationHandler = (handler) => {
  confirmationHandler = handler;
};

const getChannel = () => {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  return channel;
};

process.on('exit', () => {
  if (connection) connection.close();
});

module.exports = { 
  connectRabbitMQ, 
  getChannel,
  registerConfirmationHandler
};