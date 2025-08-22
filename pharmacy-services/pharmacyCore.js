const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const web3 = require('web3');
require('dotenv').config();

require('../database/doctorDB.js');
require('../database/pharmacyDB.js');

const router = express.Router();
router.use(cors());
router.use(express.json());

const mongoURL = process.env.MONGOURL;
const JWT_SECRET = process.env.JWT_SECRET;  

mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB (PharmacyCore)");
    })
    .catch((err) => {   
        console.error("MongoDB connection error:", err);
    });

const Doctor = mongoose.model('doctorInfo');
const Prescription = mongoose.model('prescriptionDetails');

router.get('/', (req, res) => {
    return res.status(200).json({message:"Core func (newPrescription) is running"});
});

//pharmacy core functions ...

module.exports = router;
