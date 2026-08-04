const router = require('express').Router();
const { User } = require('../../models');

router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.userId = newUser._id.toString();
        req.session.isLoggedIn = true;
        req.session.save(() => res.redirect('/events'));
    } catch (error) {
        console.error('Registration Error:', error);
        const status = error.code === 11000 ? 409 : 400;
        res.status(status).json({ message: 'Failed to register user', error: error.message });
    }
});

module.exports = router;
