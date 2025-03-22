const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Prevents duplicate genres
    },
    keywords: [{
        type: String
    }]
});

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;
 