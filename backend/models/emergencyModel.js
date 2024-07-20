const mongoose = require('mongoose');

const emergencySchema = mongoose.Schema({
    type: { type: String, required: true },
    procedures: [String],
}, {
    timestamps: true,
});

const Emergency = mongoose.model('Emergency', emergencySchema);

module.exports = Emergency;
