const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  memberCount: Number,
  visibility: String,
  color: String,
});

module.exports = mongoose.model('Groups', groupSchema);
