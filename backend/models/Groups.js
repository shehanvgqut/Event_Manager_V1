const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: String,
  topics: [String],
  memberCount: { type: Number, default: 0 },
  isPrivate: { type: Boolean, default: false },
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  creatorId: { type: String, required: true }, // creator's user ID
  members: [{ type: String }] // list of user IDs
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
