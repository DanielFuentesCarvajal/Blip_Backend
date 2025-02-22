const { httpService, userServiceBaseUrl, authServiceBaseUrl } = require('../services/httpService');

const loginUser = async (req, res) => {
  try {
    // 1. Enviar los datos al user-service para verificar las credenciales
    const userResponse = await httpService.post(`${userServiceBaseUrl}/login`, req.body);

    // 2. Enviar el userId al auth-service para generar el token
    const authResponse = await httpService.post(`${authServiceBaseUrl}/generate-token`, {
      userId: userResponse.userId,
      email: req.body.email,
    });

    // 3. Devolver el token al frontend
    res.status(200).json({ token: authResponse.token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { loginUser };