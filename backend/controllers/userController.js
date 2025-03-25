//Handles user-related actions (e.g., login, register)
/**
 * register a user (POST)
 * login a user (POST)
 * get a users favorite books (GET)
 */

const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { generateToken } = require('../utils/tokenUtils');
const {sendConfirmationEmail, sendResetEmail} = require('../services/emailService');

const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Error fetching users'}, error);
    }
}

//Get user data from the database based on the token
const getUserData = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json({
            username: user.username,
            email: user.email,
            favoriteBooks: user.favoriteBooks,
        })
    } catch (error) {
        res.status(500).json({message: 'Error fetching user data'}, error);
    }
}

//Register a new user
const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: 'User already exists'});
        
        //Create and save the new user, password will be automatically hashed by the schema
        const newUser = new User({username, email, password});
        await newUser.save();

        // Create an email confirmation token
        const emailToken = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
        );

        // Send confirmation email
        await sendConfirmationEmail(newUser.email, emailToken);

        res.status(201).json({
        message: 'Registration successful. Please check your email to confirm your account.',
        });

    } catch (error) {
        res.status(500).json({message: 'Error registering user', error});
    }
}

//Login a user
const loginUser = async (req, res) => {
    try {
        const { userNameorEmail, password } = req.body;
        const user = await User.findOne({userNameorEmail});
        if (!user) return res.status(400).json({ message: 'User not found' });

        if (!user.isVerified) {
            return res.status(401).json({ message: 'Please confirm your email before logging in.' });
          }

        //Compare the entered password with the hashed password in the database
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({message: 'Invalid password'});

        //Generate token and return user data
        const token = generateToken(user._id);
        res.status(200).json({token, user: {username: user.username, email: user.email, favoriteBooks: user.favoriteBooks}});
    } catch (error) {
        res.status(500).json({message: 'Error logging in user', error});
    }
}

const confirmEmail = async (req, res) => {
    try {
      const { token } = req.query;

      const payload = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findById(payload.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (user.isVerified) {
        return res.status(400).json({ message: 'Email already confirmed.' });
      }
  
      user.isVerified = true;
      await user.save();
  
      return res.status(200).json({
        message: 'Email confirmed successfully!',
        token: generateToken(user._id),
        user: {
          username: user.username,
          email: user.email,
          favoriteBooks: user.favoriteBooks,
        },
      });
      
    } catch (error) {
      res.status(400).json({ message: 'Invalid or expired token', error });
    }
  };
  
const resendConfirmationEmail = async (req, res) => {
    try {
        const {userNameorEmail} = req.body;
        const user = await User.findOne({userNameorEmail});

        if (!user) return res.status(404).json({message: 'No user found with that email/username.'});

        if (user.isVerified) return res.status(400).json({message: 'Email is already confirmed'});

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        await sendConfirmationEmail(user.email, token);
        res.status(200).json({message: 'Confirmation email resent'});
    } catch (error) {
        res.status(500).json({message: 'Error resending confirmation email', error});
    }
    }

const sendResetLink = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({message: 'No user found with that email'})
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        await sendResetEmail(user.email, token);
        res.status(200).json({message: 'Reset password link sent to email'})
    } catch (error) {
        res.status(500).json({message: 'Error sending reset link to email', error});
    }
}

const resetPassword = async (req, res) => {
    try {
        const {token, password} = req.body;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.userId);
        if (!user) return res.status(404).json({message: 'No user found with that email'});
        user.password = password;
        await user.save();
        res.status(200).json({message: 'Password reset successful!'});
    } catch (error) {
        res.status(500).json({message: 'Error resetting password', error});
    }
}

module.exports = {
    getUsers,
    getUserData,
    registerUser,
    loginUser,
    confirmEmail,
    resendConfirmationEmail,
    sendResetLink,
    resetPassword,
};