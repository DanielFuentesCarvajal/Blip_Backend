const chatService = require('../services/chatService');

const createOrGetChat = async (req, res) => {
  const { participant1, participant2 } = req.body;
  
  try {
    const chat = await chatService.getOrCreateChat(participant1, participant2);
    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getChat = async (req, res) => {
  const { id } = req.params;
  
  try {
    const chat = await chatService.getChat(id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserChats = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const chats = await chatService.getUserChats(userId);
    res.status(200).json(chats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateChatMessages = async (req, res) => {
  const { id } = req.params;
  const { messages } = req.body;
  
  try {
    const updatedChat = await chatService.bulkUpdateChat(id, messages);
    if (!updatedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.status(200).json(updatedChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { 
  createOrGetChat, 
  getChat, 
  getUserChats, 
  updateChatMessages 
};