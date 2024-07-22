const express = require('express');
const router = express.Router();
const { registerUser, login } = require('../controllers/userController');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const auth = require('../middleware/authMiddleware'); // Import the authentication middleware

// Load environment variables
dotenv.config();
router.post('/register', registerUser);
router.post('/login', login);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/check', auth, async (req, res) => {
    const { symptoms } = req.body;
    const profile = req.user; // Extracted from the authentication middleware
    console.log('Symptoms:', symptoms);
    console.log('Profile:', profile);
    try {
        const messages = [
            { role: 'system', content: 'You are a medical assistant. Provide possible causes for the given symptoms and suggest whether to seek medical attention or manage at home.' },
            { role: 'user', content: `The patient has the following profile: ${JSON.stringify(profile)} The patient has the following symptoms: ${symptoms.join(', ')}.` }
        ];
        console.log('OpenAI messages:', messages);
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 150,
            temperature: 0.7,
        });
        const responseText = response.choices[0].message.content.trim();
        console.log('Response:', responseText);
        res.json({ message: responseText }); // Ensure this line sends the response
    } catch (error) {
        console.error('Error:', error); // Log error for debugging
        res.status(500).json({ message: 'Error checking symptoms', error });
    }
});

router.post('/first-aid', auth, async (req, res) => {
  const { query } = req.body;

  try {
    const messages = [
      { role: 'system', content: 'You are a first aid assistant. Provide step-by-step first aid instructions based on the given query.' },
      { role: 'user', content: `The user needs first aid advice for the following situation: ${query}. Please provide step-by-step instructions.` },
    ];
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 200,
      temperature: 0.7,
    });
    const responseText = response.choices[0].message.content.trim();
    res.json({ message: responseText });
  } catch (error) {
    console.error('Error fetching first aid advice:', error);
    res.status(500).json({ message: 'Error fetching first aid advice', error });
  }
});




module.exports = router;
