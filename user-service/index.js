const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const db = require('./src/config/db');
const promisePool = require('./src/config/db');
const RabbitMQListener = require('./src/services/rabbitmqListener');
const { connectRabbitMQ, closeConnection } = require('./src/config/rabbitmq');
const chatIntegrationService = require('./src/services/chatIntegrationService'); // Importa la instancia singleton

const app = express();
const PORT = 3001;



app.use(express.json());
app.use('/users', userRoutes);


let server;
let listener;

const startServer = async () => {
  try {
    // 1. Conectar a RabbitMQ
    console.log('🔌 Conectando a RabbitMQ...');
    await connectRabbitMQ();
   // 2. Inicializar el servicio de chat (ya es singleton)
   console.log('🔄 Inicializando ChatIntegrationService...');
   await chatIntegrationService.initialize();
    
  // 3. Crear e iniciar listener
  console.log('👂 Iniciando listener de RabbitMQ...');
  listener = new RabbitMQListener();
  await listener.start();

    // 4. Iniciar servidor HTTP
    server = app.listen(PORT, () => {
      console.log(`🚀 User Service running on port ${PORT}`);
      console.log('🔗 Endpoints disponibles:');
      console.log(`- POST   http://localhost:${PORT}/users/register`);
      console.log(`- POST   http://localhost:${PORT}/users/login`);
      console.log(`- GET    http://localhost:${PORT}/users/all`); // Nuevo endpoint listado
      console.log('\n👂 Escuchando eventos de chat...');
    });

  } catch (error) {
    console.error('💥 Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

const gracefulShutdown = async () => {
  console.log('\n🔴 Apagando user-service...');
  
  try {
    // 1. Detener servidor HTTP
    if (server) {
      await new Promise(resolve => server.close(resolve));
      console.log('✅ Servidor HTTP detenido');
    }

    // 2. Detener listener RabbitMQ
    if (listener) {
      await listener.close();
      console.log('✅ Listener RabbitMQ detenido');
    }

    // 3. Cerrar conexión RabbitMQ
    await closeConnection();
    console.log('✅ Conexión RabbitMQ cerrada');

    // 4. Cerrar pool de MySQL
    await promisePool.end();
    console.log('✅ Pool de MySQL cerrado');

    console.log('✅ Servicio detenido completamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante el cierre:', error);
    process.exit(1);
  }
};

// Manejar señales de terminación
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Iniciar el servidor
startServer().catch(err => {
  console.error('Error en startServer:', err);
  process.exit(1);
});