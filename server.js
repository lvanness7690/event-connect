const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const path = require('path');
const routes = require('./controllers');
const { connectDatabase } = require('./config/connection');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required');
}
if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is required');
}

const initialization = connectDatabase();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('trust proxy', 1);

app.use(async (_req, res, next) => {
    try {
        await initialization;
        next();
    } catch (error) {
        console.error('Database initialization failed:', error);
        res.status(500).send('Database initialization failed');
    }
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
        ttl: 24 * 60 * 60,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
    },
}));

app.use(routes);

module.exports = app;

if (require.main === module) {
    initialization.then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    });
}
