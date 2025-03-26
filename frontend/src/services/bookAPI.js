import axios from 'axios';

// Sends a GET request to the backend to find a book by id
const getBookById = async (id) => {
    try {
        const response = await axios.get(`/api/books/find/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error finding book by ID:', error);
    }
};

//Sends a GET request to the backend to find a book by title or isbn
const getBooksByTitleOrIsbn = async (query) => {
    try{
        const response = await axios.get(`/api/books/find`, {params: query});
        return response.data;
    } catch(error) {
        console.error('Error finding book by title or isbn', error);
    }
}

//Sends a GET request to the backend to find books by author(s)
const getBooksByAuthors = async (query) => {
    try {
        const response = await axios.get(`/api/books/find/authors`, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error finding books by author(s)', error);
    }
}

//Sends a GET request to the backend to find books by genre(s)
const getBooksByGenres = async (query) => {
    try {
        const response = await axios.get(`/api/books/find/genres`, {params: query});
        return response.data;
    } catch(error) {
        console.error('Error finding books by genre(s)', error);
    }
}

//Sends a GET request to the backend to find books by tag(s)
const getBooksByTags = async (query) => {
    try {
        const response = await axios.get('/api/books/find/tags', {params: query});
        return response.data;
    } catch(error) {
        console.error('Error finding books by tag(s)', error);
    }
}

//Sends a GET request to filter books by reviews, ratings, tags, genres, authors


//Sends a POST request to add a tag to a book
const addTagToBook = async (id, tagName) => {
    try {
        const response = await axios.post(`/api/books/${id}/tags`, {
            tagName,
        });
        return response.data;
    } catch (error) {
        console.error('Error adding tag to book', error);
    }
}

//Sends a PATCH request to vote on a tag on a book
const voteOnTagForBook = async (bookId, tagId, vote) => {
    try {
        const response = await axios.patch(`/api/books/${bookId}/tags/${tagId}/vote`, {
            vote
        });
        return response.data;
    } catch (error) {
        console.error('Error voting on tag for book', error);
    }
}

//Sends a PATCH request to favorite or unfavorite a book
const favoriteBook = async (userId, bookId) => {
    try {
        const response = await axios.patch(`/api/books/${userId}/favorite/${bookId}`);
        return response.data;
    } catch (error) {
        console.error('Error favoriting book');
    }
}

export { 
    getBookById,
    getBooksByTitleOrIsbn,
    getBooksByGenres,
    getBooksByAuthors,
    getBooksByTags,
    addTagToBook,
    voteOnTagForBook,
    favoriteBook
}