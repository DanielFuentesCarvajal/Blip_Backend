// Base de datos en memoria mejorada
const chats = new Map();
let lastChatId = 0;

// Datos iniciales de prueba
const initializeSampleData = () => {
  const chat1 = {
    id: `chat_${++lastChatId}`,
    participant1: 'user1',
    participant2: 'user2',
    messages: [
      {
        content: 'Hola, ¿cómo estás?',
        senderId: 'user1',
        type: 'text',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        content: '¡Hola! Estoy bien',
        senderId: 'user2',
        type: 'text',
        timestamp: new Date(Date.now() - 1800000)
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  chats.set(chat1.id, chat1);
};

initializeSampleData();

const createChat = async (participant1, participant2) => {
  const existingChat = Array.from(chats.values()).find(
    chat => (chat.participant1 === participant1 && chat.participant2 === participant2) ||
            (chat.participant1 === participant2 && chat.participant2 === participant1)
  );
  
  if (existingChat) {
    return existingChat; // Retornar el chat existente en lugar de lanzar error
  }

  const id = `chat_${++lastChatId}`;
  const chat = {
    id,
    participant1,
    participant2,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  chats.set(id, chat);
  return chat;
};

const getChatById = async (id) => {
  return chats.get(id);
};

const getChatsByUser = async (userId) => {
  return Array.from(chats.values()).filter(
    chat => chat.participant1 === userId || chat.participant2 === userId
  );
};

const updateChatWithMessages = async (chatId, newMessages) => {
  const chat = chats.get(chatId);
  if (!chat) return null;

  chat.messages = [...chat.messages, ...newMessages];
  chat.updatedAt = new Date();
  
  chats.set(chatId, chat);
  return chat;
};

module.exports = { 
  createChat, 
  getChatById, 
  getChatsByUser, 
  updateChatWithMessages 
};