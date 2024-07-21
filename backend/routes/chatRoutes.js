// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getChatGPTResponse } = require('../utils/openaiClient');
router.post('/ask', auth, async (req, res) => {
    const profile = req.user; // Full user profile
    const { scenario } = req.body;

    try {
        const responseText = await getChatGPTResponse(profile, scenario);
        res.json({ response: responseText });
    } catch (error) {
        res.status(500).json({ message: 'Error generating response', error });
    }
});

module.exports = router;
