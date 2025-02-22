const { readUsers, writeUsers } = require('../config/db');

const createUser = (user) => {  // REMPLAZAR POR INSERCION EN BASE DE DATOS
  const users = readUsers();
  users.push(user);
  writeUsers(users);
  return user;
};

const getUserByEmail = (email) => { //REEMPLAZAR POR CONSULTA EN BASE DE DATOS
  const users = readUsers();
  return users.find(user => user.email === email);
};

const getUserByNick = (nick) => { //REEMPLAZAR POR CONSULTA EN BASE DE DATOS
  const users = readUsers();
  return users.find(user => user.nick === nick);
};

module.exports = { createUser, getUserByEmail, getUserByNick };