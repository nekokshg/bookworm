const axios = require('axios');
const Book = require('../models/book');

//Search the open library api based on title, author, genre and tags(subject), or isbn 
//Note: in open library genre and tags are all contained in subjects

const fetchByTitle = async (title) => {
    try {
        let response = await axios.get(`https://openlibrary.org/search.json?title=${title}`);
        if (!response.data.docs || response.data.docs.length === 0) throw new Error('No results found from Open Library');

        const book = response.data.docs[0]; //Assuming that the first book in the response is the one we want
        
        const bookData = {
            title: book.title,
            authors: book.author_name ? book.author_name : 'Unknown',
            publishedYear: book.first_publish_year,
            coverImage: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null,
            description: 'Description not available',
            OLKey: 'Not available',
            isbns: [],
        }

        const key = book.key;
        bookData.OLKey = key;
        response = await axios.get(`https://openlibrary.org${key}`);
        response = response.data;
        if (response.description.value) bookData.description = response.description.value;
        else if(response.description) bookData.description = response.description;

        return bookData;
    } catch (error) {
        throw new Error('Error fetching book from title in Open Library API');
    }
}


//const fetchByGenreOrTag

//const fetchByAuthor

const fetchByISBN = async (isbn) => {
    try{
        let response = await axios.get(`https://openlibrary.org/search.json?isbn=${isbn}`);
        if (!response.data.docs || response.data.docs.length === 0) throw new Error('No results found from Open Library');
        const book = response.data.docs[0];

        const bookData = {
            title: book.title,
            authors: book.author_name ? book.author_name.join(', ') : 'Unknown',
            publishedYear: book.first_publish_year,
            coverImage: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null,
            description: 'Description not available',
            OLKey: 'Not available',
            isbns: [isbn],
        }

        const key = book.key;
        bookData.OLKey = key;
        response = await axios.get(`https://openlibrary.org${key}`);
        response = response.data;
        if (response.description.value) bookData.description = response.description.value;
        else if(response.description) bookData.description = response.description;

        return bookData;

    } catch (error) {
        throw new Error('Error fetching book from isbn in Open Library API')
    }
}

module.exports = {
    fetchByTitle,
    fetchByISBN
}