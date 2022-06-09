const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT,
    REFRESH_SECRET,
    JWT_SECRET,
    DEBUG_MODE,
    DB_URL,
    APP_URL,
    FRONT_URL
} = process.env;