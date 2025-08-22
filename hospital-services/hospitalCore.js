const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

require('../database/doctorDB.js');
require('../database/hospitalDB.js');
require('../database/prescriptionDB.js');

const router = express.Router();
router.use(cors());
router.use(express.json());

const mongoURL = process.env.MONGOURL;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB (doctorcore)");
    })
    .catch((err) => {   
        console.error("MongoDB connection error:", err);
    });

const Doctor = mongoose.model('doctorInfo');
const Hospital = mongoose.model('hospitalInfo');
const Prescription = mongoose.model('prescriptionDetails');

router.get('/',(req,res)=>{
    return res.status(200).json({ message: "hospital core services running" });
})

router.post('/getDoctorDetails', async (req, res) => {
    try{
        const{name}=req.body;
        if(!name){
            return res.status(400).json({ message: "Hospital Name is reuired" });
        }
        const DoctorDetails = await Doctor.find({ hospital: name });
        if(DoctorDetails.length === 0){
            return res.status(404).json({ message: "No doctors found for this hospital" });
        }
        return res.status(200).json({ message: "Doctor details fetched successfully", DoctorDetails });
    }catch(error){
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

router.post('/viewPrescription/:doctorWallet', async (req, res) => {
    try{
        const { doctorWallet } = req.params;
        if (!doctorWallet) {
            return res.status(400).json({ message: "Doctor wallet address is required" });
        }
        const prescriptions = await Prescription.find({ doctorWallet: doctorWallet });
        if (prescriptions.length === 0) {
            return res.status(404).json({ message: "No prescriptions found for this doctor" });
        }
        return res.status(200).json({ message: "Prescriptions fetched successfully", prescriptions });
    }catch(error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;