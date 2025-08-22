const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

require('../database/hospitalDB.js'); 


const router = express.Router();
router.use(cors());
router.use(express.json());

const mongoURL = process.env.MONGOURL;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(mongoURL)
    .then(()=>{
        console.log("Connected to MongoDB (hospitalAuth)");
    })
    .catch((err)=>{
        console.error("MongoDB connection error:", err);
    });

const Hospital = mongoose.model('hospitalInfo');

router.get('/', (req, res) => {
    return res.status(200).json({ message: "hospital auth running" });
}); 


router.post('/signin', async (req, res) => {
    try {
        const {
            name,
            registrationNumber,
            establishmentYear,
            email,
            PhoneNumber,
            websiteLink,
            location,
            password
        } = req.body;

        if (!name || !registrationNumber||!PhoneNumber || !establishmentYear || !email || !websiteLink || !location || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingHospital = await Hospital.findOne({ registrationNumber });
        if (existingHospital) {
            return res.status(409).json({ message: "Hospital with this registration number already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newHospital = new Hospital({
            name,
            registrationNumber,
            establishmentYear,
            email,
            PhoneNumber,
            websiteLink,
            location,
            password: hashedPassword
        });

        await newHospital.save();

        const token = jwt.sign({ registrationNumber,name }, JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({ message: "Hospital registered successfully.",token });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const hospital = await Hospital.findOne({ email }).select('+password'); // <-- fix here

        if (!hospital) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, hospital.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign(
            { registrationNumber: hospital.registrationNumber, name : hospital.name },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({ token, message: "Login successful." });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
});


module.exports = router;