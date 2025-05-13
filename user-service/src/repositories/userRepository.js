const { promisePool } = require('../config/db');

// Obtener todos los usuarios
const getAllUsers = async () => {
  const [rows] = await promisePool.query(
    'SELECT idusers, nickname, mail FROM users' // Solo estos campos
  );
  return rows;
};

// Obtener un usuario por email
const getUserByEmail = async (email) => {
  const [rows] = await promisePool.query('SELECT * FROM users WHERE mail = ?', [email]);
  return rows[0];
};

// Obtener un usuario por nickname
const getUserByNick = async (nick) => {
  const [rows] = await promisePool.query('SELECT * FROM users WHERE nickname = ?', [nick]);
  return rows[0];
};

// Crear un nuevo usuario
const createUser = async (user) => {
  const { names, lastname, nickname, mail, password } = user;
  const query = `
    INSERT INTO users (names, lastname, nickname, mail, password)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await promisePool.query(query, [names, lastname, nickname, mail, password]);
  return result;
};

module.exports = { getAllUsers, getUserByEmail, getUserByNick, createUser };