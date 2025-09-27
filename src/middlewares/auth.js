const { verifyToken, extractTokenFromHeader } = require('../utils/jwt');

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = extractTokenFromHeader(authHeader);
        
        if (!token) {
            return res.status(401).json({ error: 'Authorization token missing or malformed.' });
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

module.exports = {
    authenticateToken
};
