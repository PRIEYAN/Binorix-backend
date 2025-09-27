const express = require('express');
const router = express.Router();
const patientCoreController = require('../controllers/patient.coreController');

// Patient Core Routes
router.post('/prescriptionQR', patientCoreController.createPrescriptionQR);
router.get('/prescriptionQR', patientCoreController.getPrescriptionQR);

module.exports = router;
