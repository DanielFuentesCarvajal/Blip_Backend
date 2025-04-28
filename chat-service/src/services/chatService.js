const Chat = require('../models/chatModel');
const chatRepository = require('../repositories/chatRepository');
const { publishChatEvent, publishChatRollback } = require('./messageBroker');


// Mapa para almacenar chats pendientes de confirmación
const pendingChats = new Map();
const CONFIRMATION_TIMEOUT = 8000; // 5 segundos


const getOrCreateChat = async (participant1, participant2) => {
  // Validación de participantes
  if (!participant1 || !participant2) {
    throw new Error('Both participants are required');
  }
  
  if (participant1 === participant2) {
    throw new Error('Participants must be different users');
  }

  // Buscar chat existente
  const existingChat = await Chat.findOne({
    $or: [
      { participant1, participant2 },
      { participant1: participant2, participant2: participant1 }
    ]
  });

  if (existingChat) return existingChat.toObject();
  // Crear nuevo chat
  const newChat = await Chat.create({ participant1, participant2 });
  const chatId = newChat._id.toString();

  try {
    // Publicar evento de creación
    await publishChatEvent('chat.created', {
      chatId,
      participants: [participant1, participant2],
      timestamp: new Date()
    });

    // Esperar confirmación del user-service
    const isConfirmed = await waitForConfirmation(chatId);
    
    if (!isConfirmed) {
      await Chat.deleteOne({ _id: chatId });
      throw new Error('El user-service rechazó la creación del chat');
    }

    return newChat;
  } catch (error) {
    // Limpieza en caso de error
    await Chat.deleteOne({ _id: chatId });
    throw error;
  }
};
// Esperar confirmación con timeout
const waitForConfirmation = (chatId) => {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      pendingChats.delete(chatId);
      resolve(false);
    }, CONFIRMATION_TIMEOUT);

    pendingChats.set(chatId, {
      resolve: (success) => {
        clearTimeout(timer);
        resolve(success);
      }
    });
  });
};
// Manejar confirmación recibida de RabbitMQ
const handleChatConfirmation = (chatId, success, error = '') => {
  const pendingChat = pendingChats.get(chatId);
  if (pendingChat) {
    pendingChat.resolve(success);
    pendingChats.delete(chatId);
    
    if (!success) {
      console.error(`Chat ${chatId} rechazado: ${error}`);
    }
  }
};


const getChat = async (chatId) => {
  const chat = await chatRepository.getChatById(chatId);
  return chat ? chat.toObject() : null;
};

const getUserChats = async (userId) => {
  const chats = await chatRepository.getChatsByUser(userId);
  return chats.map(chat => chat.toObject());
};

const bulkUpdateChat = async (chatId, messages) => {
  try {
    // Validar estructura básica de los mensajes primero
    messages.forEach(msg => {
      if (!msg.content || !msg.senderId || !msg.type) {
        throw new Error('All messages must have content, senderId and type');
      }
    });

    const chat = await chatRepository.updateChatWithMessages(chatId, messages);
    return chat ? chat.toObject() : null;
  } catch (error) {
    console.error('Error in bulkUpdateChat:', error);
    throw error;
  }
};

module.exports = { 
  getOrCreateChat, 
  handleChatConfirmation,
  getChat, 
  getUserChats, 
  bulkUpdateChat 
};