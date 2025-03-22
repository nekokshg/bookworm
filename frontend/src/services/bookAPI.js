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

//Sends a GET request to filter books by reviews, ratings, tags, genres, authors

export { 
    getBooksByTitleOrIsbn,
    getBooksByGenres
}