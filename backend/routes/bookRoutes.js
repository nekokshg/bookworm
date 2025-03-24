//Routes for book-related operations

const express = require('express');
const router = express.Router();
const { 
    addTagToBook, 
    voteOnTagForBook, 
    getBookById,
    getBookByTitleOrIsbn, 
    getBooksByGenres,
    getBooksByAuthors,
    getBooksByTags,
    updateBookById, 
    favoriteBook, 
    deleteBookById 
} = require('../controllers/bookController');

//POST request to add a tag to a book
router.post('/:bookId/tags', addTagToBook);

//GET request to get books based on genres
router.get('/find/genres', getBooksByGenres);

//GET request to get books based on authors
router.get('/find/authors', getBooksByAuthors);

//GET request to get books based on tags
router.get('/find/tags', getBooksByTags);

//GET request to get books based on title or isbn
router.get('/find', getBookByTitleOrIsbn);

//GET request to get book based on id
router.get('/find/:id', getBookById);

//PATCH: Update parts (or all) of a book
router.patch('/:bookId', updateBookById);

//PATCH request to vote on a tag for a specific book
router.patch('/:bookId/tags/:tagId/vote', voteOnTagForBook);

//PATCH request to favorite or unfavorite a book
router.patch('/:userId/favorite/:bookId', favoriteBook);

//DELETE: Delete a book
router.delete('/:bookId', deleteBookById);

module.exports = router;