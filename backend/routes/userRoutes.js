//Routes for user-related operations (login, register)

const express = require('express');
const router = express.Router();
const {
    authenticateToken
} = require('../middlewares/authenMiddleware')
const {
    getUsers,
    getUserData,
    registerUser,
    loginUser
} = require('../controllers/userController');

//GET request for all users
router.get('/', getUsers);

//GET request (protected route): fetch user data
router.get('/profile', authenticateToken, getUserData);

//POST request for user registration
router.post('/register', registerUser);

//POST request for user login
router.post('/login', loginUser);

module.exports = router;