const express = require('express');
const router = express.Router();

// Dummy function to simulate database query
// Replace this with your actual database query logic
async function getUsernameByUserId(userId) {
    // Simulate database call
    return new Promise((resolve) => setTimeout(() => resolve(`Username${userId}`), 100));
}

router.get('/getUsername', async (req, res) => {
    const userId = req.query.userId; // Assuming userId is passed as a query parameter
    if (!userId) {
        return res.status(400).send('UserId is required');
    }

    try {
        const username = await getUsernameByUserId(userId);
        res.json({ username });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
