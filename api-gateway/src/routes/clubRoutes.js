const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const axios = require('axios');
const router = express.Router(); // Aquí se define el router correctamente
const { getAllCommunity, createClub, getCommunityById} = require('../controllers/clubController');
const CLUB_SERVICE_BASE_URL = 'http://localhost:3003/v1.0/community'; // Base URL para los servicios de comunidad

/**
 * @swagger
 * /club/clubs:
 *   get:
 *     summary: Obtener la lista de comunidades
 *     tags: [Clubs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de comunidades obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la comunidad
 *                   name:
 *                     type: string
 *                     description: Nombre de la comunidad
 *                   description:
 *                     type: string
 *                     description: Descripción de la comunidad
 *                   image:
 *                     type: string
 *                     description: Nombre del archivo de la imagen de la comunidad
 *                   privacy:
 *                     type: string
 *                     enum: [PUBLICO, PRIVADO]
 *                     description: Tipo de privacidad de la comunidad
 *                   category:
 *                     type: string
 *                     description: Categoría de la comunidad
 *                   rules:
 *                     type: string
 *                     description: Reglas de la comunidad
 *                   owner:
 *                     type: integer
 *                     description: ID del usuario propietario de la comunidad
 *                   members_number:
 *                     type: integer
 *                     description: Número de miembros en la comunidad
 *                   tags:
 *                     type: array
 *                     description: Lista de etiquetas asociadas a la comunidad
 *                     items:
 *                       type: object
 *                       properties:
 *                         idTag:
 *                           type: string
 *                           description: ID de la etiqueta
 *                         name:
 *                           type: string
 *                           description: Nombre de la etiqueta
 *       401:
 *         description: Token no válido o no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Acceso no autorizado"
 *       500:
 *         description: Error al obtener las comunidades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Error al obtener comunidades"
 */
router.get('/clubs', authMiddleware, getAllCommunity);

/**
 * @swagger
 * /club/create:
 *   post:
 *     summary: Crear una nueva comunidad
 *     tags: [Clubs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la comunidad
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la comunidad
 *               image:
 *                 type: string
 *                 nullable: true
 *                 description: URL de la imagen de la comunidad
 *               privacy:
 *                 type: string
 *                 description: Privacidad de la comunidad (Ej. PUBLICO, PRIVADO)
 *               creation_date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de creación de la comunidad
 *               rules:
 *                 type: string
 *                 description: Reglas de la comunidad
 *               category:
 *                 type: string
 *                 description: ID de la categoría a la que pertenece la comunidad
 *               tags:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Lista de IDs de etiquetas asociadas a la comunidad
 *             example:
 *               name: "Tech Enthusiasts"
 *               descripcion: "Comunidad de tecnología"
 *               image: "https://example.com/image.png"
 *               privacy: "PUBLICO"
 *               creation_date: "2025-03-12"
 *               rules: "Reglas de respeto y buen comportamiento"
 *               category: "1"
 *               tags: [1, 2, 3]
 *     responses:
 *       201:
 *         description: Comunidad creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Comunidad creada exitosamente"
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Faltan campos requeridos"
 *       401:
 *         description: Usuario no identificado o token no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Acceso denegado. Usuario no identificado."
 *       500:
 *         description: Error al crear la comunidad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Error al crear la comunidad"
 */
router.post('/create', authMiddleware, createClub);






/**
 * @swagger
 * /club/{id}:
 *   get:
 *     summary: Obtener una comunidad por su ID
 *     tags: [Clubs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la comunidad
 *     responses:
 *       200:
 *         description: Comunidad obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la comunidad
 *                 name:
 *                   type: string
 *                   description: Nombre de la comunidad
 *                 description:
 *                   type: string
 *                   description: Descripción de la comunidad
 *                 image:
 *                   type: string
 *                   description: Nombre del archivo de la imagen de la comunidad
 *                 privacy:
 *                   type: string
 *                   enum: [PUBLICO, PRIVADO]
 *                   description: Tipo de privacidad de la comunidad
 *                 category:
 *                   type: string
 *                   description: Categoría de la comunidad
 *                 rules:
 *                   type: string
 *                   description: Reglas de la comunidad
 *                 owner:
 *                   type: integer
 *                   description: ID del usuario propietario de la comunidad
 *                 members_number:
 *                   type: integer
 *                   description: Número de miembros en la comunidad
 *                 tags:
 *                   type: array
 *                   description: Lista de etiquetas asociadas a la comunidad
 *                   items:
 *                     type: object
 *                     properties:
 *                       idTag:
 *                         type: string
 *                         description: ID de la etiqueta
 *                       name:
 *                         type: string
 *                         description: Nombre de la etiqueta
 *       401:
 *         description: Token no válido o no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Acceso no autorizado"
 *       404:
 *         description: Comunidad no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Comunidad no encontrada"
 *       500:
 *         description: Error al obtener la comunidad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Error al obtener la comunidad"
 */
router.get('/:id', authMiddleware, getCommunityById);
  
module.exports = router;