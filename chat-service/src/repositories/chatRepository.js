const Chat = require('../models/chatModel');

const createChat = async (participant1, participant2) => {
  return await Chat.create({ participant1, participant2 });
};

const getChatById = async (id) => {
  return await Chat.findById(id);
};

const getChatsByUser = async (userId) => {
  return await Chat.find({
    $or: [
      { participant1: userId },
      { participant2: userId }
    ]
  }).sort({ updatedAt: -1 }); // Ordena por más reciente primero
};

const updateChatWithMessages = async (chatId, newMessages) => {
  // Primero verificar que todos los mensajes son de participantes válidos
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new Error('Chat not found');
  }

  // Validar cada mensaje
  for (const message of newMessages) {
    if (chat.participant1 !== message.senderId && chat.participant2 !== message.senderId) {
      throw new Error(`Sender ${message.senderId} is not a participant in this chat`);
    }
  }

  // Si todas las validaciones pasan, actualizar
  return await Chat.findByIdAndUpdate(
    chatId,
    { $push: { messages: { $each: newMessages } } },
    { new: true }
  );
};

module.exports = { 
  createChat, 
  getChatById, 
  getChatsByUser, 
  updateChatWithMessages 
};