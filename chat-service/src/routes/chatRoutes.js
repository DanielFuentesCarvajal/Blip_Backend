const express = require('express');
const { 
  createOrGetChat, 
  getChat, 
  getUserChats, 
  updateChatMessages 
} = require('../controllers/chatController');

const router = express.Router();

// Crear o obtener chat existente
router.post('/', createOrGetChat);

// Obtener chat específico
router.get('/:id', getChat);

// Obtener todos los chats de un usuario
router.get('/user/:userId', getUserChats);

// Actualizar chat con múltiples mensajes
router.put('/:id/messages', updateChatMessages);

module.exports = router;