const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String },
    medicalConditions: { type: String },
    medications: { type: String },
    allergies: { type: String },
    pastSurgeries: { type: String },
    bloodType: { type: String },
    smoking: { type: Boolean },
    alcohol: { type: Boolean },
    exercise: { type: String },
    dietaryRestrictions: { type: String },
    sleepPatterns: { type: String },
    stressLevels: { type: String },
    height: { type: String },
    weight: { type: String },
    bloodPressure: { type: String },
    heartRate: { type: String },
    recentCheckup: { type: Boolean },
    wheelchair: { type: Boolean },
    emergencyContactName: { type: String },
    emergencyContactRelationship: { type: String },
    emergencyContactPhone: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
