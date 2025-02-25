const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const clubRoutes = require('./src/routes/clubRoutes');


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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Ruta a los archivos de rutas
};


const swaggerSpec = swaggerJsdoc(swaggerOptions);
// Servir la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Montar las rutas con estructura uniforme
app.use('/auth', authRoutes); // Prefix all auth routes with /auth
app.use('/user', userRoutes); // Prefix all user routes with /user
app.use('/club', clubRoutes); // Prefix all club routes with /club

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Swagger API Docs available at: http://localhost:${PORT}/api-docs`);
});