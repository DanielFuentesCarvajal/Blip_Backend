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

module.exports = { publishChatEvent };