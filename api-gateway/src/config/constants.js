require('dotenv').config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    userServiceBaseUrl: process.env.USER_SERVICE_URL,
    authServiceBaseUrl: process.env.AUTH_SERVICE_URL,
    clubServiceBaseUrl: process.env.CLUB_SERVICE_URL 
};
