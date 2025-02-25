const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration } = require('./jwtConfig');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, // { expiresIn: jwtExpiration }
  );
  };

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = { generateToken, verifyToken };