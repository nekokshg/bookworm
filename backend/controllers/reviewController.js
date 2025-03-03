//Contains the logic for handling review requests
/**
 * This includes:
 * Creating a review (POST)
 * Getting all reviews for a book (GET)
 * Getting all reviews by a user (GET)
 * Update a review for a book (PATCH)
 * Deleting a review (DELETE)
 */

const Review = require('../models/review');
const Book = require('../models/book');
const User = require('../models/user');

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: 'Error fetching reviews', error});
    }
}

//Create a new review
const createReview = async (req, res) => {
    try {
        const { userId, bookId, rating, content } = req.body;
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);
        if (!user || !book) return res.status(400).json({message: 'User or Book not found'}); //400 (Bad request) request is valid but there is no data available
        const newReview = new Review({
            userId,
            bookId,
            rating,
            content,
        });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({message: 'Error creating review', error});
    }
}

//Get all reviews for a specific book
const getAllReviewsForBook = async (req,res) => {
    try {
        const { bookId } = req.params;
        const reviews = await Review.find({bookId}.populate('userId', 'username')); //Finds all reviews for a specific book and replaces the userId field in each review with the user's username from the User collection
        if (!reviews) return res.status(400).json({message: 'No reviews found for this book'});
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: `Error fetching reviews`, error});
    }
}

//Get all reviews by a specific user
const getAllReviewsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const reviews = await Review.find({userId}.populate('bookId', 'title')); //Finds all reviews for a specific user and replaces the bookId field with the title from the Book collection
        if (!reviews) return res.status(400).json({message: 'No reviews found for this user'});
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: `Error fetching reviews`, error});
    }
}

//Edit some parts (or all) of a review for a book
const updateReviewById = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, content } = req.body;
        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({message: 'Review not found'});
        //Update only the field that are provided in the request body
        if (rating !== undefined) review.rating = rating;
        if (content) review.content = content;
        await review.save();
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({message: 'Error updating review', error});
    }
}

//Delete a review by ID
const deleteReviewById = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findById(reviewId);
        if (!review) return res.status(400).json({message: 'Review not found'});
        await review.remove();
        res.status(204).send(); //Status 204 (No Content) is used when server processes request but does not need to return any data
    } catch (error) {
        res.status(500).json({message: `Error deleting review`, error});
    }
}

module.exports = { getReviews, createReview, getAllReviewsForBook, getAllReviewsByUser, updateReviewById, deleteReviewById };

