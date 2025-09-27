const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload, expiresIn = '1d') => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

const extractTokenFromHeader = (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.split(' ')[1];
};

module.exports = {
    generateToken,
    verifyToken,
    extractTokenFromHeader
};
