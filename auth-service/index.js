const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
require('dotenv').config();
const app = express();
const PORT = 3002;

app.use(express.json());
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});