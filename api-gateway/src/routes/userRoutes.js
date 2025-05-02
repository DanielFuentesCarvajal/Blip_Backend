const express = require('express');
const { registerUser, getAllUsers } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               apellido:
 *                 type: string
 *                 description: Apellido del usuario
 *               nick:
 *                 type: string
 *                 description: Nick del usuario
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *               contraseña:
 *                 type: string
 *                 description: Contraseña del usuario
 *             example:
 *               nombre: "Carlos"
 *               apellido: "Lopez"
 *               nick: "carlosl"
 *               email: "carlos@example.com"
 *               contraseña: "password123"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: String
 *                   description: Token JWT generado
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Error en la solicitud (email o nick duplicado)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "El email ya está registrado"
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Obtener todos los usuarios (solo información pública)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idusers:
 *                     type: integer
 *                   nickname:
 *                     type: string
 *                   mail:
 *                     type: string
 *       401:
 *         description: No autorizado
 */
router.get('/all', authMiddleware, getAllUsers); // Protegido con JWT


module.exports = router;