// routes/openaiClient.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const openai = require('openai'); // Import OpenAI client

// Your OpenAI configuration and setup
openai.apiKey = 'your_openai_api_key';

// OpenAI route
router.post('/generate', auth, async (req, res) => {
  try {
    const userData = req.user;

    // Construct the prompt using user data
    const prompt = `User information:
    Name: ${userData.name}
    Age: ${userData.age}
    Weight: ${userData.weight}
    Height: ${userData.height}
    Sex: ${userData.sex}
    Diseases: ${userData.diseases}
    Wheelchair user: ${userData.wheelchair ? 'Yes' : 'No'}

    Please provide the relevant information or response based on the above data.`;

    const response = await openai.Completion.create({
      engine: 'davinci',
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    res.json({ text: response.choices[0].text });
  } catch (error) {
    res.status(500).send('Error generating response from OpenAI');
  }
});

module.exports = router;
