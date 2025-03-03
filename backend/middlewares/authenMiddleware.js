const jwt = require('jsonwebtoken');

//Middleware to authenticate the token and get user info
const authenticateToken = (req,res,next) => {
    //Extract token from authorization header
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) return res.status(401).json({message: 'Access denied'}); //401 (unauthorized)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //decode and verify token
        req.user = decoded; //Attach the userId to the request object
        next(); //Proceed to the next function (e.g., getUserData)
    } catch (error) {
        return res.status(400).json({message: 'Invalid token'}, error);
    }
}

module.exports = {
    authenticateToken
}