const { generateToken } = require('../config/jwt');

const generateTokenController = async (req, res) => {
  const { userId, email } = req.body;

  try {
    // Generar el token JWT
    const token = generateToken({ id: userId, email });

    // Devolver el token al cliente
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error generating token' });
  }
};

module.exports = { generateTokenController };