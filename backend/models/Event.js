const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
});

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    eventType: { type: String, enum: ['single', 'recurring'], required: true },
    sessions: [sessionSchema],
    location: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['upcoming', 'completed', 'cancelled'], default: 'upcoming' },
    imageUrl: { type: String, default: '' } // e.g., banner image
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
