// config/connection.js

const Sequelize = require('sequelize'); // Import Sequelize
require('dotenv').config();

let sequelize;
const databaseUrl = process.env.DATABASE_URL || process.env.JAWSDB_URL;
const pool = {
    max: 2,
    min: 0,
    acquire: 30000,
    idle: 10000,
};

if (databaseUrl) {
    sequelize = new Sequelize(databaseUrl, {
        dialect: 'mysql',
        pool,
        dialectOptions: process.env.DB_SSL === 'true'
            ? { ssl: { require: true, rejectUnauthorized: false } }
            : undefined,
    });
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'mysql',
            port: Number(process.env.DB_PORT || 3306),
            pool,
        }
    );
}

module.exports = sequelize;
