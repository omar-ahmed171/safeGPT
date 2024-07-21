// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getChatGPTResponse } = require('../utils/openaiClient');
router.post('/ask', auth, async (req, res) => {
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
