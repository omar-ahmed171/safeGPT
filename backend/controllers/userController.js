const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
    const {
        name, email, password, dateOfBirth, gender, bloodType,
        sleepPatterns, stressLevels, height, weight, smoking,
        alcohol, recentCheckup, wheelchair, chronicConditions,
        allergies, medications, exerciseFrequency, dietaryPreferences,
        healthGoals, insuranceProvider, policyNumber
    } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name, email, password: hashedPassword, dateOfBirth, gender, bloodType,
            sleepPatterns, stressLevels, height, weight, smoking, alcohol, recentCheckup,
            wheelchair, chronicConditions, allergies, medications, exerciseFrequency,
            dietaryPreferences, healthGoals, insuranceProvider, policyNumber
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            id: user._id,
            name: user.name,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            bloodType: user.bloodType,
            sleepPatterns: user.sleepPatterns,
            stressLevels: user.stressLevels,
            height: user.height,
            weight: user.weight,
            smoking: user.smoking,
            alcohol: user.alcohol,
            recentCheckup: user.recentCheckup,
            wheelchair: user.wheelchair,
            chronicConditions: user.chronicConditions,
            allergies: user.allergies,
            medications: user.medications,
            exerciseFrequency: user.exerciseFrequency,
            dietaryPreferences: user.dietaryPreferences,
            healthGoals: user.healthGoals,
            insuranceProvider: user.insuranceProvider,
            policyNumber: user.policyNumber
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, login };
