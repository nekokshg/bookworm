//Routes for book-related operations

const express = require('express');
const router = express.Router();
const { findOrCreateBook, addTagToBook, voteOnTagForBook, filterAndGetBooks, updateBookById, deleteBookById } = require('../controllers/bookController');

//POST request to search for a book or create it if not found
router.post('/findOrCreate/:searchQuery', findOrCreateBook);

//POST request to add a tag to a book
router.post('/:bookId/add-tag', addTagToBook);

//GET request to get books based on optional search and filter parameters
router.get('/', filterAndGetBooks);

//PATCH: Update parts (or all) of a book
router.patch('/:bookId', updateBookById);

//PATCH request to vote on a tag for a specific book
router.patch('/:bookId/vote-tag/:tagId', voteOnTagForBook);

//DELETE: Delte a book
router.delete('/:bookId', deleteBookById);

module.exports = router;