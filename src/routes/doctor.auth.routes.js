const express = require('express');
const router = express.Router();
const doctorAuthController = require('../controllers/doctor.authController');
const doctorCoreController = require('../controllers/doctor.coreController');

// Doctor Auth Routes
router.get('/', (req, res) => {
    return res.status(200).json({ message: "Doctor Auth Service is running" });
});

router.post('/signin', doctorAuthController.signup);
router.post('/login', doctorAuthController.login);
router.get('/getHospital', doctorAuthController.getHospitals);
router.post('/getDoctorDetails', doctorAuthController.getDoctorDetails);
router.use('/logout', doctorAuthController.logout);

module.exports = router;
