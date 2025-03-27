//Defines the schema for user-related data

const mongoose = require('mongoose');
const {
    hashPassword,
    comparePassword,
} = require('../utils/hashUtils');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    isVerified : {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        default: '',
    },
    favoriteGenres : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    favoriteTags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tag'
    }],
    favoriteBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
    bookmarkedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
    booksCompleted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    xp: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 1,
    },
    badges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Badge',
    }],
    trophies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trophy',
    }],
    bookCircles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookCircle',
    }],
    readingGoal: {
        year: Number,           // e.g., 2025
        goalCount: Number,      // total books they want to read
        booksRead: [{           // array of Book IDs they’ve marked as read
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
        }]
    },
      
});

//Hash the password before saving a new user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await hashPassword(this.password);
    next(); //Proceed with saving the user
});

//Compare the entered password with the hashed password
userSchema.methods.comparePassword = function (password) {
    return comparePassword(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;