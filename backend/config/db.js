//This file will have the code to connect to the MongoDB database using Mongoose
//It will be called when the server starts up

const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error', error);
        process.exit(1); //Exit app in case of error
    }
}

module.exports = connectDB;