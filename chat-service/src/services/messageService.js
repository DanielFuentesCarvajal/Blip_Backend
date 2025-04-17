const Message = require('../models/messageModel');
const messageRepository = require('../repositories/messageRepository');
const chatRepository = require('../repositories/chatRepository');

const createMessage = async (chatId, senderId, content, type = 'text') => {
  const message = new Message({ chatId, senderId, content, type });
  message.validate();

  // Verificar que el chat existe
  const chat = await chatRepository.getChatById(chatId);
  if (!chat) {
    throw new Error('Chat not found');
  }

  // Verificar que el remitente es participante del chat
  if (chat.participant1 !== senderId && chat.participant2 !== senderId) {
    throw new Error('Sender is not a participant in this chat');
  }

  const createdMessage = await messageRepository.createMessage(chatId, senderId, content, type);
  return new Message(createdMessage).toJSON();
};

const getMessagesByChat = async (chatId) => {
  const messages = await messageRepository.getMessagesByChat(chatId);
  return messages.map(msg => new Message(msg).toJSON());
};

module.exports = { createMessage, getMessagesByChat };