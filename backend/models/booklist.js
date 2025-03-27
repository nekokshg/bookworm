const mongoose = require('mongoose');

const bookListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }],
  isPublic: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const BookList = mongoose.model('BookList', bookListSchema);
module.exports = BookList;
