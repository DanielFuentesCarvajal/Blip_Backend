const express = require('express');
const { 
  createOrGetChat, 
  getChat, 
  getUserChats, 
  updateChatMessages 
} = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Crear o obtener un chat existente
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               participant2:
 *                 type: string
 *                 description: ID del segundo participante
 *             example:
 *               participant2: "user456"
 *     responses:
 *       200:
 *         description: Chat creado o obtenido exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', authMiddleware, createOrGetChat);

/**
 * @swagger
 * /chat/{id}:
 *   get:
 *     summary: Obtener un chat específico
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del chat
 *     responses:
 *       200:
 *         description: Chat obtenido exitosamente
 *       404:
 *         description: Chat no encontrado
 */
router.get('/:id', authMiddleware, getChat);

/**
 * @swagger
 * /chat/user/chats:
 *   get:
 *     summary: Obtener todos los chats de un usuario (extrae ID del JWT)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de chats del usuario
 *       400:
 *         description: Error en la solicitud
 */
router.get('/user/chats', authMiddleware, getUserChats);

/**
 * @swagger
 * /chat/{id}/messages:
 *   put:
 *     summary: Actualizar chat con múltiples mensajes
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     senderId:
 *                       type: string
 *                     type:
 *                       type: string
 *                       enum: [text, image, video, audio]
 *             example:
 *               messages:
 *                 - content: "Hola, ¿cómo estás?"
 *                   senderId: "user123"
 *                   type: "text"
 *                 - content: "https://example.com/image.jpg"
 *                   senderId: "user456"
 *                   type: "image"
 *     responses:
 *       200:
 *         description: Chat actualizado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       403:
 *         description: Usuario no es participante del chat
 */
router.put('/:id/messages', authMiddleware, updateChatMessages);

module.exports = router;