const { httpService, clubServiceBaseUrl } = require('../services/httpService');

const getAllCommunity = async (req, res) => {
    try {
        const communities = await httpService.get(`${clubServiceBaseUrl}/v1.0/community/communitys`);
        res.status(200).json(communities);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener comunidades', error });
    }
};

const createClub = async (req, res) => {
    try {
        const creatorUser = req.userId; // Extraer el userId del token
        const clubData = { ...req.body, creator_user: creatorUser };
        const targetUrl = `${clubServiceBaseUrl}/v1.0/community/save`;

        // 🔍 LOGS para depurar antes de hacer la solicitud
        console.log("➡️ Enviando solicitud a:", targetUrl);
        console.log("📦 Datos enviados:", JSON.stringify(clubData, null, 2));

        const newClub = await httpService.post(targetUrl, clubData);

        // Si llega aquí, la solicitud fue exitosa
        console.log("✅ Respuesta del servicio de clubes:", newClub);

        res.status(201).json(newClub);
    } catch (error) {
        console.error("❌ Error al crear la comunidad:", error.response?.data || error.message);
        res.status(500).json({ message: 'Error al crear la comunidad', error });
    }
};
