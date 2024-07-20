const mongoose = require('mongoose');

const healthProfileSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    allergies: [String],
    medications: [String],
    conditions: [String],
}, {
    timestamps: true,
});

const HealthProfile = mongoose.model('HealthProfile', healthProfileSchema);

module.exports = HealthProfile;
