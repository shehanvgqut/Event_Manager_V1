const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  visibility: String,
  color: String,
  memberCount: Number,
  members: [{ type: String }]  // assuming userId is a string for now
});

module.exports = mongoose.model('Group', groupSchema);
