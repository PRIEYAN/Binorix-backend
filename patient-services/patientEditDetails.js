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

router.get('/', (req, res) => {
    return res.status(200).json({ message: "Patient Edit Details Service is running" });
});

// POST /patient/edit-details
// Immutable fields: PhoneNumber, email, patientID (cannot be modified)
// Mutable fields: name, dob, gender, address, otherDetails
router.post('/', async (req, res) =>{
    try {
        // Get token from Authorization header
        const authHeader = req.headers['authorization'];
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization token missing or malformed.' });
        }
        const token = authHeader.split(' ')[1];

        // Verify JWT
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ error: 'Invalid or expired token.' });
        }

        const { name, PhoneNumber, email, patientID, dob, gender, address, otherDetails } = req.body;
        
        // Check for immutable fields - reject if user tries to change them
        if (PhoneNumber) {
            return res.status(400).json({ error: 'PhoneNumber cannot be modified. It is an immutable field.' });
        }
        if (email) {
            return res.status(400).json({ error: 'Email cannot be modified. It is an immutable field.' });
        }
        if (patientID) {
            return res.status(400).json({ error: 'PatientID cannot be modified. It is an immutable field.' });
        }
        
        // Find patient by email from token
        const patient = await Patient.findOne({ email: decoded.email });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found.' });
        }

        // Update only mutable fields if provided
        if (name) patient.name = name;
        if (dob) {
            // Convert DOB from DD/MM/YYYY to Date object if needed
            if (typeof dob === 'string' && dob.includes('/')) {
                const [day, month, year] = dob.split('/');
                patient.dob = new Date(`${year}-${month}-${day}`);
            } else {
                patient.dob = new Date(dob);
            }
        }
        if (gender) patient.gender = gender;
        if (address) patient.address = address;
        if (otherDetails !== undefined) patient.otherDetails = otherDetails;

        await patient.save();

        // Generate new token with updated info
        const newToken = jwt.sign({ 
            name: patient.name, 
            PhoneNumber: patient.PhoneNumber, 
            email: patient.email 
        }, JWT_SECRET, { expiresIn: '7d' });

        res.setHeader('Authorization', `Bearer ${newToken}`);
        res.status(200).json({ 
            message: "Patient details updated successfully", 
            patient: {
                patientID: patient.patientID,
                name: patient.name,
                PhoneNumber: patient.PhoneNumber,
                email: patient.email,
                dob: patient.dob,
                gender: patient.gender,
                address: patient.address,
                otherDetails: patient.otherDetails
            },
            token: newToken
        });

    } catch (error) {
        console.error("Patient edit details error:", error);
        res.status(500).json({ error: 'Failed to update patient details.', details: error.message });
    }
});

module.exports = router;


