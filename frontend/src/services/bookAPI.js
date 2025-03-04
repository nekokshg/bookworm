import axios from 'axios';

//First you filter and get books if thats not possible then try to create the book
//Sends a GET request to the backend to find a book
const getBooks = async (query) => {
    try{
        const response = await axios.get(`/api/books/find`, {params: query});
        return response.data;
    } catch(error) {
        console.error('Error finding book(s)', error);
    }
}

export { getBooks}