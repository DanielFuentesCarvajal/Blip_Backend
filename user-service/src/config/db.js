const mysql = require('mysql2');

// Configuración de la base de datos
const dbConfig = {
  host: 'sql10.freesqldatabase.com',
  user: 'sql10765905',
  password: 'WghJVkdMjK',
  database: 'sql10765905',  
};
// Crear una conexión en pool para manejar múltiples consultas de forma eficiente
const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise(); // Usar promesas para un manejo más limpio

// Funciones para leer y escribir usuarios en la base de datos
const readUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM users');
    console.log('Usuarios obtenidos:', rows);
    return rows;
  } catch (err) {
    console.error('Error al leer usuarios:', err);
    throw new Error('Error al leer usuarios: ' + err.message);
  }
};

const writeUser = async (user) => {
  try {
    const { names, lastname, nickname, mail, password } = user;

    // Validar que ningún campo esté vacío o sea nulo
    if (!names || !lastname || !nickname || !mail || !password) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      throw new Error('El formato del email no es válido');
    }

    const query = `
      INSERT INTO users (names, lastname, nickname, mail, password)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await promisePool.query(query, [names, lastname, nickname, mail, password]);
    console.log('Resultado de la inserción:', result);
    return result;
  } catch (err) {
    console.error('Error al escribir usuario:', err);
    throw new Error('Error al escribir usuario: ' + err.message);
  }
};

module.exports = { readUsers, writeUser };