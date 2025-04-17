const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const db = require('./src/config/db');
const { listener } = require('./src/services/rabbitmqListener');

const app = express();
const PORT = 3001;



app.use(express.json());
app.use('/users', userRoutes);


const server = app.listen(PORT, () => {
  console.log(` User Service running on port ${PORT}`);
  console.log(' Endpoints:');
  console.log(`- POST   http://localhost:${PORT}/users/register`);
  console.log(`- POST   http://localhost:${PORT}/users/login`);
});

// Manejo de cierre adecuado
const gracefulShutdown = async () => {
  console.log('\n🔴 Recibida señal de apagado, cerrando servidor...');
  
  try {
    // 1. Cerrar el servidor HTTP
    await new Promise((resolve) => server.close(resolve));
    
    // 2. Cerrar conexión RabbitMQ
    await listener.close();
    
    // 3. Cerrar pool de conexiones MySQL
    const pool = db.pool;
    await pool.end();
    
    console.log('✅ Todos los recursos liberados correctamente');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error durante el cierre:', err);
    process.exit(1);
  }
};

// Capturar señales de terminación
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('uncaughtException', (err) => {
  console.error('⚠️ Excepción no capturada:', err);
  gracefulShutdown();
});