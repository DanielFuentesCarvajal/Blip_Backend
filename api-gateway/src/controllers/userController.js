const { httpService, userServiceBaseUrl, authServiceBaseUrl } = require('../services/httpService');

const registerUser = async (req, res) => {
  try {
    // 1. Enviar los datos al user-service para crear el usuario
    const userResponse = await httpService.post(`${userServiceBaseUrl}/register`, req.body);

    // 2. Enviar el userId y email al auth-service para generar el token
    const authResponse = await httpService.post(`${authServiceBaseUrl}/generate-token`, {
      userId: userResponse.userId,
      email: req.body.email,
    });

    // 3. Devolver el token al frontend
    res.status(201).json({ token: authResponse.token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser };