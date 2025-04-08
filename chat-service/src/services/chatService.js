const Chat = require('../models/chatModel');
const chatRepository = require('../repositories/chatRepository');
const { publishChatEvent } = require('./messageBroker');

const getOrCreateChat = async (participant1, participant2) => {
  const chatData = await chatRepository.createChat(participant1, participant2);
  const chat = new Chat(chatData).toJSON();
  
  // Publicar evento con más detalles
  await publishChatEvent('chat.created', {
    event: 'CHAT_CREATED',
    chatId: chat.id,
    participants: [participant1, participant2],
    timestamp: new Date()
  });
  
  return chat;
};

const getChat = async (chatId) => {
  const chatData = await chatRepository.getChatById(chatId);
  if (!chatData) return null;
  return new Chat(chatData).toJSON();
};

const getUserChats = async (userId) => {
  const chats = await chatRepository.getChatsByUser(userId);
  return chats.map(chat => new Chat(chat).toJSON());
};

const bulkUpdateChat = async (chatId, messages) => {
  const chatData = await chatRepository.updateChatWithMessages(chatId, messages);
  if (!chatData) return null;
  return new Chat(chatData).toJSON();
};

module.exports = { 
  getOrCreateChat, 
  getChat, 
  getUserChats, 
  bulkUpdateChat 
};