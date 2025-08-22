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
        if(!decoded || !decoded.PhoneNumber){
            return res.status(400).json({message: "Invalid token"});
        }
        const allPrescriptions = await Prescription.find({ "doctor.PhoneNumber": decoded.PhoneNumber });
        if(!allPrescriptions || allPrescriptions.length === 0){
            return res.status(200).json({message: "No prescriptions found for this doctor"});
        }
        return res.status(200).json({message: "Prescriptions fetched successfully", prescriptions: allPrescriptions});
    }catch(err){
        return res.status(500).json({message: "Internal server error", error: err.message});
    }   
});

router.post('/rejectPrescription', async (req, res) => {
    try{
        const {token, prescriptionID} = req.body;
        if(!token || !prescriptionID){
            return res.status(400).json({message: "Token and prescriptionID are required"});
        }
        const decoded = jwt.verify(token, JWT_SECRET); // <-- use jwt here
        if(!decoded || !decoded.PhoneNumber){
            return res.status(400).json({message: "Invalid token"});
        }
        const prescription = await Prescription.findOne({prescriptionID: prescriptionID, "doctor.PhoneNumber": decoded.PhoneNumber});
        if(!prescription){
            return res.status(404).json({message: "Prescription not found"});
        }
        const rejectedPrescription = await Prescription.updateOne(
            { prescriptionID: prescriptionID, "doctor.PhoneNumber": decoded.PhoneNumber },
            { 
                $set: { 
                    status: 'rejected',
                    UpdatedTime: new Date().toISOString()
                } 
            }
        );
        if(rejectedPrescription.modifiedCount === 0){
            return res.status(400).json({message: "Failed to reject prescription"});
        }
        return res.status(200).json({message: "Prescription rejected successfully", prescription: rejectedPrescription});     
    }catch(err){
        return res.status(500).json({message: "Internal server error", error: err.message});
    }
});

module.exports = router;