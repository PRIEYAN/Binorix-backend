const express = require('express');
const router = express.Router();
const patientAuthController = require('../controllers/patient.authController');

// Patient Auth Routes
router.get('/', (req, res) => {
    return res.status(200).json({ message: "Patient Auth Service is running" });
});

router.post('/signin', patientAuthController.signup);
router.post('/login', patientAuthController.login);

module.exports = router;
