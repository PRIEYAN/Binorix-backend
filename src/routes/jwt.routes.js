const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/jwt');

router.post('/:role', async (req, res) => {
    const { role } = req.params;
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
        const decoded = verifyToken(token);
        return res.status(200).json({
            message: "JWT decoded successfully",
            role,
            payload: decoded
        });

    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
});

module.exports = router;
