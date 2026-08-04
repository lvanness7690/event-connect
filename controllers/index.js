// controllers/index.js
// Aggregates all controller routes
const router = require('express').Router();

// Import other route groups
const apiRoutes = require('./api');
const usersController = require('./api/users');
const viewRoutes = require('./viewRoutes');

// Setup API routes under '/api' prefix
router.use('/api', apiRoutes);
router.use('/', usersController);

// Setup view routes
router.use('/', viewRoutes);

module.exports = router;
