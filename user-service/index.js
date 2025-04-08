const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const db = require('./src/config/db');
const { listener } = require('./src/services/rabbitmqListener');

const app = express();
const PORT = 3001;



app.use(express.json());
app.use('/users', userRoutes);



app.listen(PORT, () => {
  console.log(` User Service running on port ${PORT}`);
  console.log(' Endpoints:');
  console.log(`- POST   http://localhost:${PORT}/users/register`);
  console.log(`- POST   http://localhost:${PORT}/users/login`);
});