const { OpenAI } = require('openai');
const dotenv = require('dotenv');


// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
 console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);const getChatGPTResponse = async (profile, scenario) => {
    try {
        console.log('User Profile:', profile);
        const messages = [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `User Profile: ${JSON.stringify(profile)}` },
            { role: 'user', content: `Emergency Scenario: ${scenario}` },
            { role: 'user', content: 'Provide personalized advice based on the user\'s profile and the emergency scenario.' }
        ];
        console.log('OpenAI messages:', messages);
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Adjust if using another model
            messages: messages,
            max_tokens: 150,
            temperature: 0.7,
        });
        console.log('OpenAI response:', response);
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        throw new Error('Error communicating with OpenAI');
    }
};

module.exports = { getChatGPTResponse };
