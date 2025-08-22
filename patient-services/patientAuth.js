const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
require('../database/patientDB.js'); // import model

const router = express.Router();
router.use(cors());
router.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

const Patient = mongoose.model('patientInfo');  

router.get('/',(req,res)=>{
    return res.status(200).json({message: "Patient Auth Service is running"});
});

router.post('/signin', async (req, res) => {
    try {
        let { name, PhoneNumber, email, password, dob, address, otherDetails } = req.body;

        if (!name || !PhoneNumber || !email || !password || !dob || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate password is not empty
        if (!password || password.trim() === '') {
            return res.status(400).json({ message: "Password cannot be empty" });
        }

        // Convert DOB from DD/MM/YYYY to Date object
        if (typeof dob === 'string' && dob.includes('/')) {
            const [day, month, year] = dob.split('/');
            dob = new Date(`${year}-${month}-${day}`);
        } else {
            dob = new Date(dob);
        }

        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ message: "Patient already exists, please login" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newPatient = new Patient({
            name,
            PhoneNumber,
            email,
            password: hashedPassword,
            dob,
            address,
            otherDetails: otherDetails || ''
        });

        await newPatient.save();

        const token = jwt.sign({ name, PhoneNumber, email }, JWT_SECRET, { expiresIn: '1d' });
        return res.status(201).json({ message: "Patient registered successfully", token });

    } catch (error) {
        console.error("Patient registration error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        const patient = await Patient.findOne({ email: email }).select('+password');
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        
        if (!patient.password) {
            return res.status(500).json({ message: "Invalid patient data - password missing" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        
        const token = jwt.sign({ name: patient.name, PhoneNumber: patient.PhoneNumber, email: patient.email }, JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error("Patient login error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;
