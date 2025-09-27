const express = require('express');
const router = express.Router();
const patientCoreController = require('../controllers/patient.coreController');

// Patient Edit Details Routes
router.get('/', (req, res) => {
    return res.status(200).json({ message: "Patient Edit Details Service is running" });
});

router.post('/', patientCoreController.updatePatientDetails);

module.exports = router;
