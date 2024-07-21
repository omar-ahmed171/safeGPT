const { OpenAI } = require('openai');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);

const getChatGPTResponse = async (profile, scenario) => {
    try {
        const messages = [
            { role: 'system', content: 'You are a medical assistant. Provide possible causes for the given symptoms and suggest whether to seek medical attention or manage at home.' },
            { role: 'user', content: `The patient has the following profile: ${JSON.stringify(profile)} and the following scenario: ${scenario}.` }
        ];
        console.log('OpenAI messages:', messages);

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 150,
            temperature: 0.7,
        });

        console.log('OpenAI response:', response);
        const responseText = response.choices[0].message.content.trim();
        console.log('Response:', responseText);

        return responseText;
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        throw new Error('Error communicating with OpenAI');
    }
};

module.exports = { getChatGPTResponse };
