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
        required: true,
    }],
    subgenres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Subgenre', //Reference to Subgenre model
    }],
    description: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    coverImage: {
        type: String, //This will store the URL of the cover image
        required: false,
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