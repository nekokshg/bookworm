//Contains functions to generate and verify JWT tokens
//This will be used to authenticate users and authorize them to access protected routes

const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1h'});
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken,
}