const router = require('express').Router();
const { Event, User } = require('../../models');

router.get('/', async (_req, res) => {
    try {
        const events = await Event.find().lean();
        res.status(200).json(events.map((event) => ({ ...event, id: event._id })));
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/:eventId/attendees', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Log in to attend an event' });
    }

    try {
        const [user, event] = await Promise.all([
            User.findById(req.session.userId),
            Event.findById(req.params.eventId),
        ]);

        if (!event || !user) {
            return res.status(404).json({ error: 'Event or user not found' });
        }

        event.attendees.addToSet(user._id);
        await event.save();
        return res.status(201).json({ message: 'Attendee added successfully' });
    } catch (error) {
        console.error('Error adding attendee:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
