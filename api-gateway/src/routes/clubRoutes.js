const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const axios = require('axios');
const router = express.Router(); // Aquí se define el router correctamente

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
 *                   descripcion:
 *                     type: string
 *                     description: Descripción de la comunidad
 *                   image:
 *                     type: string
 *                     description: URL de la imagen de la comunidad
 *                   privacidad:
 *                     type: string
 *                     description: Tipo de privacidad de la comunidad (Ej. PUBLICO)
 *                   creation_date:
 *                     type: string
 *                     format: date
 *                     description: Fecha de creación de la comunidad
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
router.get('/clubs', authMiddleware, async (req, res) => {
    try {
        const url = `${CLUB_SERVICE_BASE_URL}/communitys`;
        // Realiza la solicitud a la API de servicios de comunidades
        const response = await axios.get(url , {
            headers: {
                Authorization: req.headers['authorization'], // Enviar el token al backend
            }
        });

        // Responde con la lista de comunidades obtenida
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error al obtener las comunidades:", error);
        res.status(500).json({ message: 'Error al obtener comunidades', error: error.message });
    }
});
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
 *                 description: Descripción de la comunidad (opcional)
 *               image:
 *                 type: string
 *                 description: URL de la imagen de la comunidad
 *               privacidad:
 *                 type: string
 *                 description: Privacidad de la comunidad (Ej. PUBLICO)
 *               creation_date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de creación de la comunidad
 *               rules:
 *                 type: string
 *                 description: Reglas de la comunidad
 *             example:
 *               name: "Comunidad de Música"
 *               descripcion: "Descripción opcional"
 *               image: "https://example.com/image.png"
 *               privacidad: "PUBLICO"
 *               creation_date: "2023-10-01"
 *               rules: "Reglas de la comunidad"
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
router.post('/create', authMiddleware, async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: 'Acceso denegado. Usuario no identificado.' });
    }

    // Agregar el creator_id al cuerpo de la solicitud
    req.body.creator_user = req.userId; // Agregar creator_user desde el token

    // Logs para depurar
    console.log("Token verificado, ID recibida:", req.body.creator_user);
    console.log("Datos de la solicitud al backend:", JSON.stringify(req.body, null, 2)); // Log detallado

    try {
        // Realizamos la solicitud al servicio de crear comunidad
        const url = `${CLUB_SERVICE_BASE_URL}/save`;
        const response = await axios.post(url, req.body, {
            headers: {
                Authorization: req.headers['authorization'], // Pasar el token de autorización
            }
        });
        res.status(201).json({ message: "Comunidad creada exitosamente" });
    } catch (error) {
        console.error("Error al crear la comunidad:", error);
        res.status(500).json({ message: "Error al crear la comunidad" });
    }
});


  
module.exports = router;