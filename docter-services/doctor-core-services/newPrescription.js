const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const web3 = require('web3');
require('dotenv').config();

require('../../database/doctorDB.js');
require('../../database/prescriptionDB.js');
require('../../database/patientDB.js');

const router = express.Router();
router.use(cors());
router.use(express.json());

const mongoURL = process.env.MONGOURL;
const JWT_SECRET = process.env.JWT_SECRET;  

mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB (newprescription)");
    }  )
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

const Doctor = mongoose.model('doctorInfo');
const Prescription = mongoose.model('prescriptionDetails');
const Patient = mongoose.model('patientInfo');

router.get('/', (req, res) => {
    return res.status(200).json({message:"Core func (newPrescription) is running"});
});

router.post('/getPatientDetails', async (req, res) => {
  try {
    const { PhoneNumber } = req.body;

    if (!PhoneNumber) {
      return res.status(400).json({ message: "PhoneNumber is required" });
    }

    const existingPatient = await Patient.findOne({ PhoneNumber });

    if (!existingPatient) {
      return res.status(404).json({ message: "Patient not found, register first" });
    }

    return res.status(200).json({
      message: "Patient details fetched successfully",
      patient: existingPatient
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message
    });
  }
});

router.post('/newPrescription', async (req, res) => {
    try{
        const {
            doctorWallet,
            patientWallet,
            doctorName,
            doctorPhoneNumber,
            doctorHospital,
            doctorSpecialization,
            doctorEmail,
            patientName,
            patientPhoneNumber,
            patientEmail,
            patientGender,
            medicines,
            advice,
        } = req.body;

        // Debug: Log the received data
        console.log("Received prescription data:", req.body);
        
        // Check each field individually and provide specific error messages
        if (!doctorWallet) {
            return res.status(400).json({ message: "doctorWallet is required" });
        }
        if (!patientWallet) {
            return res.status(400).json({ message: "patientWallet is required" });
        }
        if (!doctorName) {
            return res.status(400).json({ message: "doctorName is required" });
        }
        if (!doctorPhoneNumber) {
            return res.status(400).json({ message: "doctorPhoneNumber is required" });
        }
        if (!doctorHospital) {
            return res.status(400).json({ message: "doctorHospital is required" });
        }
        if (!doctorSpecialization) {
            return res.status(400).json({ message: "doctorSpecialization is required" });
        }
        if (!doctorEmail) {
            return res.status(400).json({ message: "doctorEmail is required" });
        }
        if (!patientName) {
            return res.status(400).json({ message: "patientName is required" });
        }
        if (!patientPhoneNumber) {
            return res.status(400).json({ message: "patientPhoneNumber is required" });
        }
        if (!patientEmail) {
            return res.status(400).json({ message: "patientEmail is required" });
        }
        if (!patientGender) {
            return res.status(400).json({ message: "patientGender is required" });
        }
        if (!medicines) {
            return res.status(400).json({ message: "medicines is required" });
        }
        if (!Array.isArray(medicines)) {
            return res.status(400).json({ message: "medicines must be an array" });
        }
        if (medicines.length === 0) {
            return res.status(400).json({ message: "medicines array cannot be empty" });
        }

        // Validate medicines array structure
        for (const medicine of medicines) {
            if (
                !medicine.name ||
                !medicine.quantity ||
                !medicine.timing ||
                !medicine.foodIntake ||
                !medicine.instructions ||
                typeof medicine.timing.morning !== 'boolean' ||
                typeof medicine.timing.afternoon !== 'boolean' ||
                typeof medicine.timing.night !== 'boolean'
            ) {
                return res.status(400).json({ message: `Medicine '${medicine.name || 'unknown'}' is missing required fields` });
            }
        }

        //storing in db
        const newPrescription = new Prescription({
            doctorWallet,
            patientWallet,
            doctor: {
                name: doctorName,
                nmrNumber: doctorPhoneNumber,
                specialization: doctorSpecialization,
                hospitalName: doctorHospital,
                hospital: doctorHospital,
                email: doctorEmail
            },
            patient: {
                name: patientName,
                PhoneNumber: patientPhoneNumber,
                email: patientEmail,
                gender: patientGender
            },
            medicines: medicines,
            advice: advice || '',
            status: 'processing',
        });
        await newPrescription.save();

        return res.status(201).json({message: "Prescription created successfully", prescription: newPrescription});
    }catch(err){
        return res.status(500).json({message: "Internal server error",error:err.message});
    }
});

router.post('/newPrescription/uploadImage', async (req, res) => {
    try {
        const { prescriptionId, imageUrl } = req.body;
        if (!prescriptionId || !imageUrl) {
            return res.status(400).json({ message: "Prescription ID and image URL are required" });
        }
        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ message: "Prescription not found" });
        }
        prescription.ORImage = imageUrl;
        await prescription.save();
        return res.status(200).json({ message: "Image uploaded successfully", prescription });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
});


module.exports = router;
