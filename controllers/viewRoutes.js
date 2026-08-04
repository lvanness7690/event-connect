const axios = require('axios');
const router = require('express').Router();
const { User, Event, Message } = require('../models');

function normalizeTicketmasterEvent(event) {
    return {
        id: event.id,
        name: event.name,
        dates: event.dates,
        _embedded: event._embedded,
        images: event.images || [],
        info: event.info || event.pleaseNote || '',
        url: event.url,
    };
}

function normalizeStungEvent(event) {
    const slug = event.slug || event.id;
    const start = event.start_utc || event.start || event.date;
    return {
        id: `stung--${slug}`,
        name: event.title || event.name || 'Untitled event',
        dates: { start: { localDate: start ? String(start).slice(0, 10) : null } },
        _embedded: { venues: [{ name: event.venue_name || event.venue?.name || event.city || 'Venue to be announced' }] },
        images: event.image_url || event.image ? [{ url: event.image_url || event.image }] : [],
        info: event.description || event.summary || `${event.category || 'Live'} event in ${event.city || 'your area'}`,
        url: event.ticket_url || event.url,
    };
}

async function searchEvents(city) {
    if (process.env.TICKETMASTER_API_KEY) {
        const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
            params: { apikey: process.env.TICKETMASTER_API_KEY, city },
            timeout: 10000,
        });
        return (response.data._embedded?.events || []).map(normalizeTicketmasterEvent);
    }

    const response = await axios.get('https://api.stungevents.com/events', {
        params: { city, limit: 24 },
        timeout: 10000,
    });
    return (response.data.events || []).map(normalizeStungEvent);
}

async function getExternalEvent(eventId) {
    if (eventId.startsWith('stung--')) {
        const slug = eventId.slice('stung--'.length);
        const response = await axios.get(`https://api.stungevents.com/events/${encodeURIComponent(slug)}`, { timeout: 10000 });
        return normalizeStungEvent(response.data.event);
    }

    if (!process.env.TICKETMASTER_API_KEY) {
        throw new Error('This Ticketmaster event is no longer available');
    }

    const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/${encodeURIComponent(eventId)}.json`, {
        params: { apikey: process.env.TICKETMASTER_API_KEY },
        timeout: 10000,
    });
    return normalizeTicketmasterEvent(response.data);
}

router.get('/', (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/events');
    }
    return res.render('home', { loggedIn: false });
});

router.get('/events', (_req, res) => res.render('events'));

router.get('/login', (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/events');
    }
    return res.render('login', { loggedIn: false });
});

router.post('/login', async (req, res) => {
    try {
        const identifier = String(req.body.username || '').trim();
        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier.toLowerCase() }],
        });

        if (!user || !(await user.checkPassword(req.body.password || ''))) {
            return res.status(401).send('Invalid username/email or password');
        }

        req.session.userId = user._id.toString();
        req.session.isLoggedIn = true;
        return req.session.save(() => res.status(200).json({ id: user._id, username: user.username }));
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).send('Internal Server Error');
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error('Error destroying session:', error);
            return res.redirect('/');
        }
        return res.redirect('/login');
    });
});

router.get('/api/search-events', async (req, res) => {
    try {
        const city = String(req.query.city || '').trim();
        if (!city) {
            return res.status(400).json({ error: 'City is required' });
        }
        return res.json(await searchEvents(city));
    } catch (error) {
        console.error('Error fetching events:', error.message);
        return res.status(502).json({ error: 'The event provider is temporarily unavailable' });
    }
});

router.get('/event/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        let event = await Event.findById(eventId).populate('attendees', 'username');

        if (!event) {
            const external = await getExternalEvent(eventId);
            event = await Event.create({
                _id: eventId,
                name: external.name,
                date: external.dates?.start?.localDate,
                location: external._embedded?.venues?.[0]?.name || 'Venue to be announced',
                image: external.images?.[0]?.url,
                description: external.info,
                ticketUrl: external.url,
            });
        }

        const populatedEvent = await Event.findById(eventId).populate('attendees', 'username').lean();
        const messages = await Message.find({ eventId }).sort({ createdAt: 1 }).populate('userId', 'username').lean();
        return res.render('event', {
            event: {
                ...populatedEvent,
                id: populatedEvent._id,
                users: populatedEvent.attendees,
            },
            messages: messages.map((message) => ({
                content: message.content,
                createdAt: message.createdAt,
                username: message.userId?.username || 'Event Connect user',
            })),
            loggedIn: req.session.isLoggedIn,
        });
    } catch (error) {
        console.error('Error fetching event details:', error.message);
        return res.status(500).send('Unable to load this event');
    }
});

router.get('/dashboard', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/');
    }

    try {
        const events = await Event.find({ attendees: req.session.userId }).lean();
        return res.render('dashboard', {
            events: events.map((event) => ({ ...event, id: event._id })),
            loggedIn: true,
        });
    } catch (error) {
        console.error('Error loading dashboard:', error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
