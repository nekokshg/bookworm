const mongoose = require('mongoose');

const trophySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  icon: String, // optional image
  awardedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookCircle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookCircle',
  },
  awardedFor: {
    type: String, // e.g., "Trivia Champion", "Top Reviewer", "Challenge Winner"
  },
  awardedAt: {
    type: Date,
    default: Date.now,
  },
});

const Trophy = mongoose.model('Trophy', trophySchema);
module.exports = Trophy;
