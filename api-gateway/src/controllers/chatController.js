const { httpService } = require('../services/httpService');
const authMiddleware = require('../middlewares/authMiddleware');

const createOrGetChat = async (req, res) => {
  try {
    // Extraemos ambos participantes del body
    const { participant1, participant2 } = req.body;
    
    // Validamos que vengan ambos participantes
    if (!participant1 || !participant2) {
      return res.status(400).json({ message: 'Both participants are required' });
    }

    const response = await httpService.post(`${process.env.CHAT_SERVICE_URL}`, {
      participant1,
      participant2
    });
    
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ 
      message: error.message || 'Error creating/retrieving chat',
      error: error.toString() 
    });
  }
};

const getChat = async (req, res) => {
  const { id } = req.params;
  
  try {
    const response = await httpService.get(`${process.env.CHAT_SERVICE_URL}/${id}`);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserChats = async (req, res) => {
  try {
    // Extraemos el userId del token JWT (ya verificado por el middleware)
    const userId = req.userId;
    
    const response = await httpService.get(`${process.env.CHAT_SERVICE_URL}/user/${userId}`);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateChatMessages = async (req, res) => {
  const { id } = req.params;
  const { messages } = req.body;
  
  try {
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: 'Messages must be an array' });
    }

    const response = await httpService.put(
      `${process.env.CHAT_SERVICE_URL}/${id}/messages`,
      { messages }
    );
    
    res.status(200).json(response);
  } catch (error) {
    const status = error.message.includes('not a participant') ? 403 : 400;
    res.status(status).json({ 
      message: error.message,
      details: error.details || null
    });
  }
};

module.exports = { 
  createOrGetChat, 
  getChat, 
  getUserChats, 
  updateChatMessages 
};