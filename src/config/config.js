// configuration file for managing environment variables

require("dotenv").config();// Load environment variables from .env file

module.exports = {
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: process.env.DB_PORT || 5432,
};
