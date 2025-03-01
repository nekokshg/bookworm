//Defines the schema for book reviews
/**
 * Each review includes the following:
 * userId: The user who submitted the review (referencing the User model)
 * bookId: The book being reviewed (referencing the Book model)
 * rating: A float representing the rating (e.g., 1 to 5 stars) 
 * content: The text content of the review
 * createdAt: The timestamp when the review was created
 */

const mongoose = require('mongoose');

//Schema setup
const reviewSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //Reference the User model
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', //Reference the Book model
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        validate : {
            validator: (v) => v % 0.5 === 0, // Allow only half-star increments
            message: 'Rating must be a multiple of 0.5'
        },
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        tyep: Date,
        default: Date.now,
    },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;