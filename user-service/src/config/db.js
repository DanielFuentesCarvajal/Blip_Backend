const mysql = require('mysql2');

// Configuración de la base de datos
const dbConfig = {
  host: 'sql10.freesqldatabase.com',
  user: 'sql10776467',
  password: 'phzyUUzq2n',
  database: 'sql10776467',  
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

console.log('Creando pool de conexiones...');
const pool = mysql.createPool(dbConfig);
console.log('Pool creado, configurando promisePool...');
const promisePool = pool.promise();
console.log('PromisePool configurado');
// Exportar ambos para poder cerrar el pool
module.exports = pool.promise();