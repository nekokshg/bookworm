//Routes for book-related operations

const express = require('express');
const router = express.Router();
const { 
    createBook, 
    addTagToBook, 
    voteOnTagForBook, 
    getBookByTitleOrIsbn, 
    getBooksByGenres,
    updateBookById, 
    favoriteBook, 
    deleteBookById 
} = require('../controllers/bookController');

//POST request to add a tag to a book
router.post('/:bookId/add-tag', addTagToBook);

//GET request to get books based on title or isbn
router.get('/find', getBookByTitleOrIsbn);

//GET request to get books based on genres
router.get('/find/genres', getBooksByGenres);

//PATCH: Update parts (or all) of a book
router.patch('/:bookId', updateBookById);

//PATCH request to vote on a tag for a specific book
router.patch('/:bookId/vote-tag/:tagId', voteOnTagForBook);

//PATCH request to favorite or unfavorite a book
router.patch('/:userId/favorite/:bookId', favoriteBook);

//DELETE: Delete a book
router.delete('/:bookId', deleteBookById);

module.exports = router;