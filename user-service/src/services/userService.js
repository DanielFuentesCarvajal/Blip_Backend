const User = require('../models/userModel');
const userRepository = require('../repositories/userRepository');
const chatIntegrationService = require('./chatIntegrationService'); // Asegúrate de importar
// Registrar un nuevo usuario
const registerUser = async (userData) => {
  // Crear una instancia del modelo User
  const user = new User(userData);

  // Validar el usuario
  user.validate();

  // Verificar si el email ya está registrado
  const existingUserByEmail = await userRepository.getUserByEmail(user.mail);
  if (existingUserByEmail) {
    throw new Error('El email ya está registrado');
  }

  // Verificar si el nick ya está en uso
  const existingUserByNick = await userRepository.getUserByNick(user.nickname);
  if (existingUserByNick) {
    throw new Error('El nick ya está en uso');
  }

  // Crear el usuario en la base de datos
  const newUser = await userRepository.createUser(user.toJSON());
  return newUser;
};

// Iniciar sesión
const loginUser = async (email, password) => {
  // Validar campos obligatorios
  if (!email || !password) {
    throw new Error('Todos los campos son obligatorios');
  }

  // Buscar el usuario por email
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Verificar la contraseña
  if (user.password !== password) {
    throw new Error('Credenciales inválidas');
  }

  return user;
};

module.exports = { registerUser, loginUser };