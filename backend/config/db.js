//This file will have the code to connect to the MongoDB database using Mongoose
//It will be called when the server starts up

const mongoose = require('mongoose');
const Genre = require('../models/genre');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        //await Genre.deleteMany(); // Clears old genres before importing
        //await Genre.insertMany(genres); // Inserts new genres
    } catch (error) {
        console.error('MongoDB connection error', error);
        process.exit(1); //Exit app in case of error
    }
}

module.exports = connectDB;