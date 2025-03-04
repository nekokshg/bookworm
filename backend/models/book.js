//Defines the schema for book data
/**
 * Each book includes the following:
 * title
 * authors
 * genres
 * subgenres <= from Subgenre model
 * description
 * published year
 * createdAt
 * updatedAt
 */

const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    authors: [{
        type: String,
        required: true,
    }],
    genres: [{
        type: String, //Store genres as strings (e.g., ["Fantasy", "Romance"])
        required: false,
    }],
    tags: [{
        tagId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' },
        popularityCount: { type: Number, default: 0 },  // Popularity count for this tag on the specific book
    }],
    description: {
        type: String,
        required: false,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    coverImage: {
        type: String, //This will store the URL of the cover image
        required: false,
    },
    popularity: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
