const express = require('express');
const router = express.Router();
const { getChatGPTResponse } = require('../utils/openaiClient');

// Define the route for handling ChatGPT requests
router.post('/ask', async (req, res) => {
    const { profile, scenario } = req.body;
    try {
        const response = await getChatGPTResponse(profile, scenario);
        res.json({ response });
    } catch (error) {
        console.error('Error in /api/chat/ask:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
