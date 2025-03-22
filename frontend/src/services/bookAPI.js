import axios from 'axios';

//Sends a GET request to the backend to find a book by title or isbn
const getBooksByTitleOrIsbn = async (query) => {
    try{
        const response = await axios.get(`/api/books/find`, {params: query});
        console.log(response.data)
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

export { 
    getBooksByTitleOrIsbn,
    getBooksByGenres,
    getBooksByAuthors,
    getBooksByTags
}