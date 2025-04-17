const mysql = require('mysql2');

// Configuración de la base de datos
const dbConfig = {
  host: 'sql10.freesqldatabase.com',
  user: 'sql10772038',
  password: 'Vw9Qjvxugm',
  database: 'sql10772038',  
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Crear una conexión en pool para manejar múltiples consultas de forma eficiente
const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise(); // Usar promesas para un manejo más limpio

// Exportar ambos para poder cerrar el pool
module.exports = {
  promisePool,
  pool // Necesario para poder cerrar las conexiones
};