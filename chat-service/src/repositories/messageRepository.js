// Base de datos en memoria mejorada
const messages = new Map();
let lastMessageId = 0;

// Datos iniciales de prueba
const initializeSampleData = () => {
  const message1 = {
    id: `msg_${++lastMessageId}`,
    chatId: 'chat_1',
    senderId: 'user1',
    content: 'Hola, ¿cómo estás?',
    type: 'text',
    status: 'delivered',
    createdAt: new Date(Date.now() - 3600000)
  };
  
  const message2 = {
    id: `msg_${++lastMessageId}`,
    chatId: 'chat_1',
    senderId: 'user2',
    content: '¡Hola! Estoy bien, ¿y tú?',
    type: 'text',
    status: 'read',
    createdAt: new Date(Date.now() - 1800000)
  };

  messages.set(message1.id, message1);
  messages.set(message2.id, message2);
};

initializeSampleData();
const createMessage = async (chatId, senderId, content, type) => {
  const id = `msg_${++lastMessageId}`;
  const message = {
    id,
    chatId,
    senderId,
    content,
    type,
    status: 'sent',
    createdAt: new Date()
  };
  
  messages.set(id, message);
  return message;
};

const getMessagesByChat = async (chatId) => {
  return Array.from(messages.values()).filter(
    msg => msg.chatId === chatId
  ).sort((a, b) => a.createdAt - b.createdAt);
};

module.exports = { createMessage, getMessagesByChat };