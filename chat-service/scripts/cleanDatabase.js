// scripts/cleanDatabase.js

const mongoose = require('mongoose');

const run = async () => {
  const connectionString = 'mongodb+srv://a06881854:9QEbTi5IdZclm7Xd@chatcluster.fs9oikq.mongodb.net/?retryWrites=true&w=majority&appName=ChatCluster';

  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Conectado a MongoDB');

    const Chat = require('../src/models/chatModel');
    const Message = require('../src/models/messageModel');

    const deletedChats = await Chat.deleteMany({});
    const deletedMessages = await Message.deleteMany({});

    console.log(`🧹 Limpieza completada:
    - Chats eliminados: ${deletedChats.deletedCount}
    - Mensajes eliminados: ${deletedMessages.deletedCount}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error limpiando la base de datos:', error);
    process.exit(1);
  }
};

run();
