//Routes for book-related operations

const express = require('express');
const router = express.Router();
const { findOrCreateBook, filterAndGetBooks, updateBookById, deleteBookById } = require('../controllers/bookController');

//POST request to search for a book or create it if not found
router.post('/findOrCreate/:searchQuery', findOrCreateBook);

//GET request to get books based on optional search and filter parameters
router.get('/', filterAndGetBooks);

//PATCH: Update parts (or all) of a book
router.patch('/:bookId', updateBookById);

//DELETE: Delte a book
router.delete('/:bookId', deleteBookById);

module.exports = router;