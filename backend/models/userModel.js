const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String },
   
    bloodType: { type: String },
   
    sleepPatterns: { type: String },
    stressLevels: { type: String },
    height: { type: String },
    weight: { type: String },
    smoking: { type: Boolean },
    alcohol: { type: Boolean },
    recentCheckup: { type: Boolean },
    wheelchair: { type: Boolean },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
