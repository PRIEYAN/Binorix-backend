const express = require('express');
const jwt = require('jsonwebtoken');
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
const Patient = null;

router.get('/', (req, res) => {
    return res.status(200).json({message:"Prescription Request Service is running"});
});

router.post('/prescriptionRequest', async (req, res) => {
    try{
        const{token, prescriptionID} = req.body;
        if(!token || !prescriptionID){
            return res.status(400).json({message: "Token and prescriptionID are required"});
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if(!decoded || !decoded.PhoneNumber){
            return res.status(400).json({message: "Invalid token"});
        }
        // Use the correct field name 'prescrptionID' for searching
        const prescription = await Prescription.findOne({prescrptionID: prescriptionID, "doctor.PhoneNumber": decoded.PhoneNumber});
        if(!prescription){
            return res.status(404).json({message: "Prescription not found",doctorPhoneNumber: decoded.PhoneNumber,prescriptionID: prescriptionID});
        }
        const approvPrescription = await Prescription.updateOne(
            { prescrptionID: prescriptionID, "doctor.PhoneNumber": decoded.PhoneNumber },
            { 
                $set: { 
                    status: 'approved',
                    updatedDate: new Date()
                } 
            }
        );
        if(approvPrescription.modifiedCount === 0){
            return res.status(400).json({message: "Failed to approve prescription"});
        }
        return res.status(200).json({message: "Prescription approved successfully", prescription: approvPrescription});     
    }catch(err){
        return res.status(500).json({message: "Internal server error", error: err.message});
    }
});

module.exports = router;