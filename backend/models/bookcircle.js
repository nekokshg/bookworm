const mongoose = require('mongoose');

const bookCircleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  booksBeingRead: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }],
  discussions: [{
    title: String,
    content: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trophy'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const BookCircle = mongoose.model('BookCircle', bookCircleSchema);
module.exports = BookCircle;
