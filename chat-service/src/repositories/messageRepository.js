const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');

const createMessage = async (chatId, senderId, content, type = 'text') => {
  // Verifica que el chat existe
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new Error('Chat not found');
  }

  // Verifica que el remitente es participante
  if (chat.participant1 !== senderId && chat.participant2 !== senderId) {
    throw new Error('Sender is not a participant in this chat');
  }

  return await Message.create({ chatId, senderId, content, type });
};

const getMessagesByChat = async (chatId) => {
  return await Message.find({ chatId }).sort({ createdAt: 1 }); // Ordena por más antiguo primero
};

module.exports = { createMessage, getMessagesByChat };