//Set up express, import routes, start the DB, and start the server

//Initialization
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./config/db");

dotenv.config();
const app = express();

//Enable cors
app.use(cors());

//Connect to MongoDB
connectDB();

//Middleware setup
app.use(express.json());

//Routes setup

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});