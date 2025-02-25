const { readUsers, writeUser } = require('../config/db');

// Crear usuario
const createUser = async (user) => {
  try {
    const result = await writeUser(user);
    console.log('Resultado de la inserción:', result);
    return result;
  } catch (err) {
    throw new Error('Error al crear usuario: ' + err.message);
  }
};

// Obtener usuario por correo
const getUserByEmail = async (email) => {
  try {
    const users = await readUsers();
    console.log('Usuarios obtenidos por email:', users);
    return users.find(user => user.mail === email);
  } catch (err) {
    throw new Error('Error al obtener usuario por email: ' + err.message);
  }
};

// Obtener usuario por nickname
const getUserByNick = async (nick) => {
  try {
    const users = await readUsers();
    console.log('Usuarios obtenidos por nickname:', users);
    return users.find(user => user.nickname === nick);
  } catch (err) {
    throw new Error('Error al obtener usuario por nickname: ' + err.message);
  }
};

module.exports = { createUser, getUserByEmail, getUserByNick };
