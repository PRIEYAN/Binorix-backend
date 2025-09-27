const express = require('express');
const router = express.Router();
const pharmacyCoreController = require('../controllers/pharmacy.coreController');

// Pharmacy Core Routes
router.get('/', (req, res) => {
    return res.status(200).json({ message: "Core func (newPrescription) is running" });
});

// Pharmacy core functions can be added here
router.get('/:pharmacyId', pharmacyCoreController.getPharmacyDetails);

module.exports = router;
