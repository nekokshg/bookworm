//Defines the schema for user-related data

const mongoose = require('mongoose');
const {
    hashPassword,
    comparePassword,
} = require('../utils/hashUtils');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
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
    favoriteBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }]
});

//Hash the password before saving a new user
userSchema.pre('save', async (next) => {
    if (!this.isModified('password')) return next();

    this.password = await hashPassword(this.password);
    next(); //Proceed with saving the user
});

//Compare the entered password with the hashed password
userSchema.methods.comparePassword = (password) => {
    return comparePassword(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;