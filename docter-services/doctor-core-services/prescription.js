const express = require('express');
const cors = require('cors');
require('dotenv').config();

const newPrescription = require('./newPrescription.js');
const prescriptionHistory = require('./prescriptionHistory.js'); // Uncomment when implemented
const prescriptionReq = require('./prescriptionReq.js'); // Uncomment when implemented

const router = express.Router();

router.use(cors());
router.use(express.json());

router.use(newPrescription);
router.use(prescriptionHistory);
router.use(prescriptionReq);

router.get('/', (req, res) => {
    res.status(200).json({ message: "Prescription Service is running" });
});

module.exports = router;