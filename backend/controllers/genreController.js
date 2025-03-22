const Genre = require('../models/genre');

//Get all the genres from the DB and store them into a hashMap with their ids for quick look ups
//Only performed once when server starts up
const genreLookup = {};
const loadGenres = async () => {
    const genres = await Genre.find();
    genres.forEach(genre => {
        genreLookup[genre.name.toLowerCase()] = genre._id; //Store name -> ID
    });
    console.log('Genres loaded into Hash Map')
}

//Convert genre array to ids
const genresToIds = (genreArr) => {
    return genreArr
        .map(genre => genreLookup[genre.toLowerCase()]) //Convert name to ID
        .filter(Boolean) //Remove undefined values (genres that don't exist)
}

module.exports = {
    loadGenres,
    genreLookup,
    genresToIds
}
