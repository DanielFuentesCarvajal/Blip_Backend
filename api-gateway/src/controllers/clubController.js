const { httpService, clubServiceBaseUrl } = require('../services/httpService');
const axios = require('axios');

const getAllCommunity = async (req, res) => {
    try {
        const url = `${clubServiceBaseUrl}/communitys`;
        console.log("➡️ Haciendo solicitud a:", url);

        const response = await axios.get(url, {
            headers: { Authorization: req.headers['authorization'] }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error al obtener las comunidades:", error);
        res.status(500).json({ message: 'Error al obtener comunidades', error: error.message });
    }
};

const createClub = async (req, res) => {
    try {
        req.body.creator_user = req.userId;

        console.log("Token verificado, ID recibida:", req.body.creator_user);
        console.log("Datos de la solicitud al backend:", JSON.stringify(req.body, null, 2));

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
        const { id } = req.params;
        const url = `${clubServiceBaseUrl}/${id}`;
        console.log("➡️ Haciendo solicitud a:", url);

        const response = await axios.get(url, {
            headers: { Authorization: req.headers['authorization'] }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error al obtener la comunidad por ID:", error);
        res.status(500).json({ message: 'Error al obtener la comunidad por ID', error: error.message });
    }
};

const getAllCategory = async (req, res) => {
    try {
        const url = `${clubServiceBaseUrl}/categories/category`;
        console.log("➡️ Haciendo solicitud a:", url);

        const response = await axios.get(url, {
            headers: { Authorization: req.headers['authorization'] }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        res.status(500).json({ message: 'Error al obtener las categorías', error: error.message });
    }
};

const getAllTags = async (req, res) => {
    try {
        const url = `${clubServiceBaseUrl}/tags/tag`;
        console.log("➡️ Haciendo solicitud a:", url);

        const response = await axios.get(url, {
            headers: { Authorization: req.headers['authorization'] }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error al obtener los tags:", error);
        res.status(500).json({ message: 'Error al obtener los tags', error: error.message });
    }
};

// 🔥 Aquí empiezan los NUEVOS MÉTODOS:

const joinCommunity = async (req, res) => {
    try {
        const url = `${clubServiceBaseUrl}/join`;
        console.log("➡️ Haciendo solicitud POST a:", url);

        const response = await axios.post(url, req.body, {
            headers: { Authorization: req.headers['authorization'] }
        });

        res.status(200).json({ message: 'Unido a la comunidad correctamente', data: response.data });
    } catch (error) {
        console.error("Error al unirse a la comunidad:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ message: 'Error al unirse a la comunidad', error: error.message });
    }
};

const exitCommunity = async (req, res) => {
    try {
        const url = `${clubServiceBaseUrl}/exit`;
        console.log("➡️ Haciendo solicitud DELETE a:", url);

        const response = await axios.delete(url, {
            headers: {
                Authorization: req.headers['authorization']
            },
            data: req.body
        });

        res.status(200).json({ message: 'Saliste de la comunidad correctamente', data: response.data });
    } catch (error) {
        console.error("Error al salir de la comunidad:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ message: 'Error al salir de la comunidad', error: error.message });
    }
};

const getAllCommunitiesByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const url = `${clubServiceBaseUrl}/user/communitys/${id}`;
        console.log("➡️ Haciendo solicitud GET a:", url);

        const response = await axios.get(url, {
            headers: { Authorization: req.headers['authorization'] }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error al obtener las comunidades por userId:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ message: 'Error al obtener comunidades por usuario', error: error.message });
    }
};

const userInCommunity = async (req, res) => {
    try {
        const url = `${clubServiceBaseUrl}/user/in/community`;
        console.log("➡️ Haciendo solicitud GET a:", url);

        const response = await axios.get(url, {
            headers: { Authorization: req.headers['authorization'] }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error al verificar si el usuario está en comunidad:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ message: 'Error al verificar usuario en comunidad', error: error.message });
    }
};

// 📦 Exportamos todo
module.exports = { 
    getAllCommunity, 
    createClub, 
    getCommunityById, 
    getAllCategory, 
    getAllTags,
    joinCommunity,
    exitCommunity,
    getAllCommunitiesByUserId,
    userInCommunity
};
