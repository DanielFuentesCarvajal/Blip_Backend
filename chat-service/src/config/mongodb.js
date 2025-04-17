const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    // Usa tu cadena de conexión de Atlas aquí
    const connectionString = process.env.MONGODB_URI || 'mongodb+srv://a06881854:9QEbTi5IdZclm7Xd@chatcluster.fs9oikq.mongodb.net/?retryWrites=true&w=majority&appName=ChatCluster';
    
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Manejo de eventos de conexión
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Cerrar conexión al terminar
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = connectMongoDB;