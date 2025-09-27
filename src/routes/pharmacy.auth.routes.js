const express = require('express');
const router = express.Router();
const pharmacyAuthController = require('../controllers/pharmacy.authController');

// Pharmacy Auth Routes
router.get('/', (req, res) => {
    return res.status(200).json({ message: "Pharmacy Auth Service is running" });
});

router.post('/signin', pharmacyAuthController.signup);
router.post('/login', pharmacyAuthController.login);

module.exports = router;
