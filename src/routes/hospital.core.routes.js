const express = require('express');
const router = express.Router();
const hospitalCoreController = require('../controllers/hospital.coreController');

// Hospital Core Routes
router.get('/', (req, res) => {
    return res.status(200).json({ message: "hospital core services running" });
});

router.post('/getDoctorDetails', hospitalCoreController.getDoctorDetails);
router.post('/viewPrescription/:doctorWallet', hospitalCoreController.viewPrescriptions);

module.exports = router;
