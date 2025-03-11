const { httpService, clubServiceBaseUrl } = require('../services/httpService');
const axios = require('axios');

const getAllCommunity = async (req, res) => {
    try {
        const url = `${clubServiceBaseUrl}/communitys`; // Construcción correcta de la URL
        console.log("➡️ Haciendo solicitud a:", url); // LOG para depuración

        // Realiza la solicitud al servicio de comunidades
        const response = await axios.get(url, {
            headers: {
                Authorization: req.headers['authorization'], // Enviar el token de autenticación
            }
        });

        // Devuelve la respuesta con la lista de comunidades
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error al obtener las comunidades:", error);
        res.status(500).json({ 
            message: 'Error al obtener comunidades', 
            error: error.message 
        });
    }
};

const createClub = async (req, res) => {
    try {
        // Si `authMiddleware` pasó, req.userId siempre estará definido
        req.body.creator_user = req.userId; 

        console.log("Token verificado, ID recibida:", req.body.creator_user);
        console.log("Datos de la solicitud al backend:", JSON.stringify(req.body, null, 2));

        // Realiza la petición al microservicio de comunidades
        const response = await axios.post(`${clubServiceBaseUrl}/save`, req.body, {
            headers: { Authorization: req.headers['authorization'] }
        });

        return res.status(201).json({ message: "Comunidad creada exitosamente", data: response.data });
    } catch (error) {
        console.error("Error al crear la comunidad:", error.response?.data || error.message);
        return res.status(error.response?.status || 500).json({ message: "Error al crear la comunidad" });
    }
};
const getCommunityById = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de la comunidad desde los parámetros de la URL
        const url = `${clubServiceBaseUrl}/${id}`; // Construir la URL para obtener la comunidad por ID
        console.log("➡️ Haciendo solicitud a:", url); // LOG para depuración

        // Realiza la solicitud al servicio de comunidades
        const response = await axios.get(url, {
            headers: {
                Authorization: req.headers['authorization'], // Enviar el token de autenticación
            }
        });

        // Devuelve la respuesta con los datos de la comunidad
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error al obtener la comunidad por ID:", error);
        res.status(500).json({ 
            message: 'Error al obtener la comunidad por ID', 
            error: error.message 
        });
    }
};

module.exports = { getAllCommunity, createClub, getCommunityById };