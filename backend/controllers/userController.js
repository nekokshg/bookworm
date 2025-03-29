//Handles user-related actions (e.g., login, register)
/**
 * register a user (POST)
 * login a user (POST)
 * get a users favorite books (GET)
 */

const User = require('../models/user');
const Badge = require('../models/badge');
const Trophy = require('../models/trophy');
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

      const user = await User.findById(userId)
          .populate('favoriteBooks')
          .populate('bookmarkedBooks')
          .populate('badges') // If you store badge/trophy IDs
          .populate('trophies');
  
      if (!user) return res.status(404).json({ message: 'User not found' });

      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        favoriteGenres: user.favoriteGenres,
        favoriteTags: user.favoriteTags,
        xp: user.xp,
        level: user.level,
        booksCompleted: user.booksCompleted,
        favoriteBooks: user.favoriteBooks,
        bookmarkedBooks: user.bookmarkedBooks,
        badges: user.badges,
        trophies: user.trophies,
        readingGoal: user.readingGoal || null,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user data', error });
    }
  };
  

//Register a new user
const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;
        let existingUser = await User.findOne({username});
        if (existingUser) return res.status(400).json({message: 'That username is already taken.'});

        existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: 'An account with that email already exists.'});
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
            return res.status(400).json({ message: 'Password does not meet strength requirements' });
        }
          
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
        res.status(200).json({
            token,
            user: {
              _id: user._id,
              username: user.username,
              email: user.email,
              avatarUrl: user.avatarUrl,
              xp: user.xp,
              level: user.level,
              favoriteBooks: user.favoriteBooks,
              bookmarkedBooks: user.bookmarkedBooks,
            }
          });
          
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
  
      res.status(200).json({
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          avatarUrl: user.avatarUrl,
          xp: user.xp,
          level: user.level,
          favoriteBooks: user.favoriteBooks,
          bookmarkedBooks: user.bookmarkedBooks,
        }
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
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
            return res.status(400).json({ message: 'Password does not meet strength requirements' });
        }
        user.password = password;
        await user.save();
        res.status(200).json({message: 'Password reset successful!'});
    } catch (error) {
        res.status(500).json({message: 'Error resetting password', error});
    }
}

const updateAvatar = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {avatarUrl} = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {avatarUrl},
      {new: true}
    );
    res.status(200).json({message: 'Avatar updated', avatarUrl: user.avatarUrl})
  } catch (error) {
    res.status(500).json({message: 'Error updating avatar', error})
  }
}

const updateBio = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {bio} = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {bio},
      {new: true}
    );
    res.status(200).json({message: 'Bio updated', bio: user.bio})
  } catch (error) {
    res.status(500).json({message: 'Error updating bio', error})
  }
}

const updateGenres = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {favoriteGenres} = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {favoriteGenres},
      {new: true}
    );
    res.status(200).json({message: 'Favorite genres updated', favoriteGenres: user.favoriteGenres})
  } catch (error) {
    res.status(500).json({message: 'Error updating favorite genres', error})
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
    updateAvatar,
    updateBio,
    updateGenres,
};