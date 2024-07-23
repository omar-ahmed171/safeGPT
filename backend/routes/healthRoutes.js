const express = require('express');
const router = express.Router();
const multer = require('multer');
const tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');
const pdfPoppler = require('pdf-poppler');
const auth = require('../middleware/authMiddleware');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Load environment variables
dotenv.config();

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const upload = multer({ dest: 'uploads/' });
const convertPdfToImage = async (pdfPath) => {
    const outputDir = path.dirname(pdfPath);
    const outputBase = path.basename(pdfPath, path.extname(pdfPath));

    const options = {
        format: 'png',
        out_dir: outputDir,
        out_prefix: outputBase,
        page: null, // Convert all pages
    };

    await pdfPoppler.convert(pdfPath, options);

    const files = fs.readdirSync(outputDir);
    return files.filter(file => file.startsWith(outputBase) && file.endsWith('.png')).map(file => path.join(outputDir, file));
};

const performOcr = async (imagePath) => {
    const { data: { text } } = await tesseract.recognize(imagePath, 'eng', {
        logger: m => console.log(m),
    });
    return text;
};

router.post('/upload', auth, upload.single('file'), async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'File is required' });
    }

    try {
        let text = '';
        const filePath = file.path;

        if (file.mimetype === 'application/pdf') {
            const imagePaths = await convertPdfToImage(filePath);
            for (const imagePath of imagePaths) {
                text += await performOcr(imagePath);
                fs.unlinkSync(imagePath); // Clean up the generated image file
            }
        } else {
            text = await performOcr(filePath);
        }

        fs.unlinkSync(filePath); // Clean up the uploaded file

        const messages = [
            { role: 'system', content: 'You are a medical assistant. Analyze the following medical document text and provide an explanation.' },
            { role: 'user', content: text },
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 200,
            temperature: 0.7,
        });

        if (response && response.choices && response.choices.length > 0) {
            res.json({ message: response.choices[0].message.content.trim() });
        } else {
            console.error('Unexpected API response:', response);
            res.status(500).json({ message: 'Unexpected API response', response });
        }
    } catch (error) {
        console.error('Error processing document:', error);
        res.status(500).json({ message: 'Error processing document', error });
    }
});

module.exports = router;
