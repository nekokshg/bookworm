//Set up express, import routes, start the DB, and start the server

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const tagRoutes = require('./routes/tagRoutes');
const genreRoutes = require('./routes/genreRoutes')
const { loadGenres } = require('./controllers/genreController');

dotenv.config();
const app = express();

//Enable cors
app.use(cors());

//Connect to MongoDB
connectDB();

//Load genres into hashmap
loadGenres();

//Middleware setup
app.use(express.json());

//Routes setup
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/genres', genreRoutes);

// Add a route for the root URL
app.get('/', (req, res) => {
    res.send('Server is running');  // Return a message to show server is up
});

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
