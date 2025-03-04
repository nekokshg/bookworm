import axios from 'axios';

//Sends a POST request to the backend to find/create a book
const findOrCreateBook = async (query) => {
    try {
        const response = await axios.post(`/api/books/findOrCreate/${query}`);
        return response.data;
    } catch (error) {
        console.error('Error finding book', error);
        throw error;
    }
}

export { findOrCreateBook}