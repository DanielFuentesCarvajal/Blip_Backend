require('dotenv').config(); // ✅ Forma correcta
console.log("JWT_SECRET:", process.env.JWT_SECRET, process.env.JWT_EXPIRATION); //  Verifica que no sea "undefined"

module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION
};
