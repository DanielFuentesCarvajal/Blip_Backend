const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gateway',
      version: '1.0.0',
      description: 'Documentación de la API Gateway',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Ruta a los archivos de rutas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Servir la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Montar las rutas sin prefijos redundantes
app.use('/', authRoutes); // Elimina el prefijo /auth
app.use('/', userRoutes); // Elimina el prefijo /users

app.listen(PORT, () => {
  console.log(`api Gateway running on port ${PORT}`);
  console.log(`Swagger API Docs available at: http://localhost:${PORT}/api-docs`);
});