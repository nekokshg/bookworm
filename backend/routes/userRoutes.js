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
    loginUser,
    confirmEmail,
    resendConfirmationEmail,
    sendResetLink,
    resetPassword,
    updateAvatar,
    updateBio,
    updateGenres,
} = require('../controllers/userController');

//GET request for all users
router.get('/', getUsers);

//GET request (protected route): fetch user data
router.get('/profile', authenticateToken, getUserData);

router.get('/confirm-email', confirmEmail);

//POST request for user registration
router.post('/register', registerUser);

//POST request for user login
router.post('/login', loginUser);

//POST request to resend confirmation email
router.post('/resend-confirmation', resendConfirmationEmail);

//POST request to send reset link
router.post('/request-password-reset', sendResetLink);

//PATCH request to reset password
router.patch('/reset-password', resetPassword);

//PATCH request to update avatar
router.patch('/avatar', authenticateToken, updateAvatar);

//PATCH request to update bio
router.patch('/bio', authenticateToken, updateBio);

router.patch('/favorite-genres', authenticateToken, updateGenres)

module.exports = router;