const { getChannel } = require('../config/rabbitmq');

const publishChatEvent = async (eventType, eventData) => {
  try {
    const channel = getChannel();
    const message = {
      ...eventData,
      service: 'chat-service',
      timestamp: new Date()
    };
    
    await channel.publish(
      'chat_events',
      eventType,
      Buffer.from(JSON.stringify(message)),
      { persistent: true } // Mensajes persistentes
    );
    
    console.log(`📤 Sent RabbitMQ event: ${eventType}`);
    console.log('Event details:', message);
  } catch (error) {
    console.error('Error publishing event:', error);
    throw error;
  }
};
const publishChatRollback = async (chatId) => {
  try {
    const channel = getChannel();
    const message = {
      event: 'CHAT_ROLLBACK',
      chatId,
      timestamp: new Date()
    };
    
    await channel.publish(
      'chat_events',
      'chat.rollback',
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
    
    console.log(`📤 Sent RabbitMQ rollback event for chat: ${chatId}`);
  } catch (error) {
    console.error('Error publishing rollback event:', error);
    throw error;
  }
};

module.exports = { publishChatEvent, publishChatRollback };