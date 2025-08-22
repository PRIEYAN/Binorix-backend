const express = require('express');
const jwt = require('jsonwebtoken'); // <-- rename here
const cors = require('cors');
const mongoose = require('mongoose');
const web3 = require('web3');
require('dotenv').config();

require('../../database/doctorDB.js');
require('../../database/prescriptionDB.js');

const router = express.Router();
router.use(cors());
router.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;  

const Doctor = mongoose.model('doctorInfo');
const Prescription = mongoose.model('prescriptionDetails');


router.get('/',(req,res)=>{
    return res.status(200).json({message:"History Service is running"});    
});

router.post('/getPrescriptionDetails', async (req, res) => {
    try{
        const {token} = req.body;
        if(!token){
            return res.status(400).json({message: "token is required"});
        }
        const decoded = jwt.verify(token, JWT_SECRET); // <-- use jwt here
        if(!decoded || !decoded.email){
            return res.status(400).json({message: "Invalid token"});
        }
        const allPrescriptions = await Prescription.find({ "doctor.email": decoded.email });
        if(!allPrescriptions || allPrescriptions.length === 0){
            return res.status(200).json({message: "No prescriptions found for this doctor"});
        }
        const processingPrescription = allPrescriptions.filter(prescription => prescription.status === 'processing');
        if(processingPrescription.length > 0){
            return res.status(200).json({message: "Prescriptions fetched successfully", prescriptions: processingPrescription} );
        }
        return res.status(200).json({message: "Prescriptions fetched successfully", prescriptions: processingPrescription});
    }catch(err){
        return res.status(500).json({message: "Internal server error", error: err.message});
    }   
});

router.post('/completedPrescription', async (req, res) => {
    try{
        const {token} = req.body;
        if(!token ){
            return res.status(400).json({message: "Token is required"});
        }
        const decoded = jwt.verify(token, JWT_SECRET); // <-- use jwt here
        if(!decoded || !decoded.email){
            return res.status(400).json({message: "Invalid token"});
        }
        
        const allPrescriptions = await Prescription.find({ "doctor.email": decoded.email });
        if(!allPrescriptions || allPrescriptions.length === 0){
            return res.status(200).json({message: "No prescriptions found for this doctor"});
        }
        const completedPrescription = await allPrescriptions.filter(prescription => prescription.status === 'completed');
        return res.status(200).json({message: "Prescription completed successfully", prescriptions: completedPrescription});     
    }catch(err){
        return res.status(500).json({message: "Internal server error", error: err.message});
    }
});

module.exports = router;