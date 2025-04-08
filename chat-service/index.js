const express = require('express');
const { connectRabbitMQ } = require('./src/config/rabbitmq');
const chatRoutes = require('./src/routes/chatRoutes');

const app = express();
const port = 3007;

app.use(express.json());
app.use('/chats', chatRoutes);

const startServer = async () => {
  try {
    await connectRabbitMQ();
    
    app.listen(port, () => {
      console.log(`🚀 Chat Service running on port ${port}`);
      console.log('🔗 Endpoints:');
      console.log(`- POST   http://localhost:${port}/chats`);
      console.log(`- GET    http://localhost:${port}/chats/:id`);
      console.log(`- GET    http://localhost:${port}/chats/user/:userId`);
      console.log(`- PUT    http://localhost:${port}/chats/:id/messages`);
      console.log('\n👂 Listening for RabbitMQ events...');
    });
  } catch (err) {
    console.error('💥 Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});