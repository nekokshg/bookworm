//Defines the API endpoints for each action related to reviews
//Connects the routes to the review controller functions

const express = require('express');
const router = express.Router();
const { getReviews, createReview, getAllReviewsForBook, getAllReviewsByUser, updateReviewById, deleteReviewById } = require('../controllers/reviewController');

router.get('/', getReviews);

//POST: Create a review
router.post('/create', createReview);

//GET: Get all reviews for a specific book
router.get('/book/:bookId', getAllReviewsForBook);

//GET: Get all reviews for a specific user
router.get('/user/:userId', getAllReviewsByUser);

//PATCH: Update parts (or all) of a review for a book
router.patch('/:reviewId', updateReviewById);

//DELETE: Delete a review
router.delete('/:reviewId', deleteReviewById);

module.exports = router;