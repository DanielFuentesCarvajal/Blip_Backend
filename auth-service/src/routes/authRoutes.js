const express = require('express');
const { generateTokenController } = require('../controllers/authController');

const router = express.Router();

// Endpoint para generar tokens
router.post('/generate-token', generateTokenController);

module.exports = router;