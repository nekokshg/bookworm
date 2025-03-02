//Set up express, import routes, start the DB, and start the server

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const tagRoutes = require('./routes/tagRoutes');

dotenv.config();
const app = express();

//Enable cors
app.use(cors());

//Connect to MongoDB
connectDB();

//Middleware setup
app.use(express.json());

//Routes setup
app.use('./api/user', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/tags', tagRoutes);

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});