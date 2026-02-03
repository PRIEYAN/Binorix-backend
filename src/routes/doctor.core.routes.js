const express = require('express');
const router = express.Router();
const doctorCoreController = require('../controllers/doctor.coreController');
const { authenticateToken } = require('../middlewares/auth');

// Doctor Core Routes
router.get('/', (req, res) => {
    res.status(200).json({ message: "Prescription Service is running" });
});

router.post('/getPatientDetails', doctorCoreController.getPatientDetails);
router.post('/newPrescription', doctorCoreController.createPrescription);
router.post('/newPrescription/uploadImage', doctorCoreController.uploadPrescriptionImage);
router.get('/getPrescriptionDetails/:doctorWallet', doctorCoreController.getPrescriptionDetails);
router.post('/completedPrescription', doctorCoreController.completePrescription);
router.post('/prescriptionRequest', doctorCoreController.approvePrescriptionRequest);
router.post('/getPrescription', authenticateToken, doctorCoreController.getPrescription);

module.exports = router;
