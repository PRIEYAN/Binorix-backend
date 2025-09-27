const express = require('express');
const router = express.Router();
const hospitalAuthController = require('../controllers/hospital.authController');

// Hospital Auth Routes
router.get('/', (req, res) => {
    return res.status(200).json({ message: "hospital auth running" });
});

router.post('/signin', hospitalAuthController.signup);
router.post('/login', hospitalAuthController.login);

module.exports = router;
