const router = require('express').Router();
const { Event, Message, User } = require('../../models');

router.post('/:eventId', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Log in to post a message' });
    }

    try {
        const [event, user] = await Promise.all([
            Event.findById(req.params.eventId),
            User.findById(req.session.userId),
        ]);

        if (!event || !user) {
            return res.status(404).json({ error: 'Event or user not found' });
        }

        const newMessage = await Message.create({
            content: req.body.content,
            eventId: req.params.eventId,
            userId: req.session.userId,
        });

        return res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error posting message:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
