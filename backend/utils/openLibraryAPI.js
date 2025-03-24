const axios = require('axios');
const Book = require('../models/book');
const Genre = require('../models/genre');
const {     
    keywordGenreMap
} = require('./mappingUtils');

//Search the open library api based on title or isbn 
//Note: in open library genre and tags are all contained in subjects
const fetchByTitle = async (title) => {
    try {
        let response = await axios.get(`https://openlibrary.org/search.json?title=${title}`);
        if (!response.data.docs || response.data.docs.length === 0) throw new Error('No results found from Open Library');

        const book = response.data.docs[0]; //Assuming that the first book in the response is the one we want

        const bookData = {
            title: book.title,
            genres: [],
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

        //Get the genres from the subjects in works 
        //If there is no subjects leave the genres blank
        if(response.subjects) {
            const genresArray = subjectToGenre(response.subjects);
            if (genresArray.length !== 0) {
                bookData.genres = genresArray;
            }
        }

        try{
            //Get the book description from the works
            if (response.description.value) {
                bookData.description = response.description.value;
            }
            else if(response.description) {
                bookData.description = response.description;
            }
        } catch (error) {
            console.error('No description available on Open Library', error);
        }

        return bookData;
    } catch (error) {
        throw new Error('Error fetching book from title in Open Library API');
    }
}

const fetchByISBN = async (isbn) => {
    try{
        let response = await axios.get(`https://openlibrary.org/search.json?isbn=${isbn}`);
        if (!response.data.docs || response.data.docs.length === 0) throw new Error('No results found from Open Library');
        const book = response.data.docs[0];

        const bookData = {
            title: book.title,
            genres: [],
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
        if(response.subjects) {
            const genresArray = subjectToGenre(response.subjects);
            if (genresArray.length !== 0) {
                bookData.genres = genresArray;
            }
        }
        
        try{
            //Get the book description from the works
            if (response.description.value) {
                bookData.description = response.description.value;
            }
            else if(response.description) {
                bookData.description = response.description;
            }
        } catch (error) {
            console.error('No description available on Open Library', error);
        }
        return bookData;

    } catch (error) {
        throw new Error('Error fetching book from isbn in Open Library API')
    }
}

// Function to map Open Library subjects to standard genres with partial matching, avoiding duplicates
const subjectToGenre = (subjects) => {
    const matchedGenres = new Set();
    let genresArray = subjects.map(s => s.trim().toLowerCase());
    genresArray = genresArray
        .map(s => keywordGenreMap[s])
        .filter(Boolean) //Shortcut for removing falsy values
    genresArray.forEach(genre => matchedGenres.add(genre));
    return Array.from(matchedGenres);
}


module.exports = {
    fetchByTitle,
    fetchByISBN
}