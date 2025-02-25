const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/constants');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Token recibido:", token); // Log del token recibido

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        console.log("Token decodificado:", decoded); // Log del token decodificado
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Error al verificar el token:", error); // Log si hay error en la verificación
        return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
};


module.exports = authMiddleware; // Ensure this is exported correctly