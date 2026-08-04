const mongoose = require('mongoose');

let connectionPromise;

async function connectDatabase() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is required');
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
            maxPoolSize: 5,
            serverSelectionTimeoutMS: 10000,
        }).catch((error) => {
            connectionPromise = undefined;
            throw error;
        });
    }

    await connectionPromise;
    return mongoose.connection;
}

module.exports = { connectDatabase, mongoose };
