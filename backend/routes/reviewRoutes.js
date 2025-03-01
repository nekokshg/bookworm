//Defines the API endpoints for each action related to reviews
//Connects the routes to the review controller functions

const express = require('express');
const router = express.Router();
const { createReview, getAllReviewsForBook, getAllReviewsByUser, editReviewById, deleteReviewById } = require('../controllers/reviewController');

//POST: Create a review
router.post('/', createReview);

//GET: Get all reviews for a specific book
router.get('/book/:bookId', getAllReviewsForBook);

//GET: Get all reviews for a specific user
router.get('/book/:userId', getAllReviewsByUser);

//PATCH: Edit parts (or all) of a review for a book
router.patch('/:reviewId', editReviewById);

//DELETE: Delete a review
router.delete('/:reviewId', deleteReviewById);

module.exports = router;