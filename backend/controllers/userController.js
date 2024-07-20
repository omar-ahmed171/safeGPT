const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register User
const registerUser = async (req, res) => {
    const {
        name, email, password, dateOfBirth, gender, medicalConditions, medications, allergies,
        pastSurgeries, bloodType, smoking, alcohol, exercise, dietaryRestrictions, sleepPatterns,
        stressLevels, height, weight, bloodPressure, heartRate, recentCheckup, wheelchair, emergencyContactName,
        emergencyContactRelationship, emergencyContactPhone
    } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name, email, password: hashedPassword, dateOfBirth, gender, medicalConditions, medications,
            allergies, pastSurgeries, bloodType, smoking, alcohol, exercise, dietaryRestrictions, sleepPatterns,
            stressLevels, height, weight, bloodPressure, heartRate, recentCheckup, wheelchair, emergencyContactName,
            emergencyContactRelationship, emergencyContactPhone
        });
        await user.save();

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = { registerUser };
