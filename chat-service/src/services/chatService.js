const Chat = require('../models/chatModel');
const chatRepository = require('../repositories/chatRepository');
const { publishChatEvent } = require('./messageBroker');

const getOrCreateChat = async (participant1, participant2) => {
  // Primero busca si el chat existe
  const existingChat = await Chat.findOne({
    $or: [
      { participant1, participant2 },
      { participant1: participant2, participant2: participant1 }
    ]
  });

  // Si el chat ya existe, simplemente lo retornamos sin publicar evento
  if (existingChat) {
    return existingChat.toObject();
  }

  // Si no existe, lo creamos
  const newChat = await Chat.create({ participant1, participant2 });
  
  // Publicar evento solo para chats nuevos
  await publishChatEvent('chat.created', {
    event: 'CHAT_CREATED',
    chatId: newChat._id.toString(),
    participants: [participant1, participant2],
    timestamp: new Date()
  });
  
  return newChat.toObject();
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
  getChat, 
  getUserChats, 
  bulkUpdateChat 
};