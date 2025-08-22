const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const PrescriptionQR = require('../database/prescriptionQR-DB');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

router.use(cors());
router.use(express.json());

// POST /prescription-qr-with-jwt
router.post('/prescriptionQR', async (req, res) => {
    try {
        const { patientWalletAddress, QRImg, PhoneNumber } = req.body;

        if (!patientWalletAddress || !QRImg || !PhoneNumber) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        const newQR = new PrescriptionQR({
            patientWalletAddress,
            QRImg,
            PhoneNumber
        });

        const savedQR = await newQR.save();

        // Create a JWT for this QR
        const payload = {
            PhoneNumber: savedQR.PhoneNumber
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(201).json({ qr: savedQR, token });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create Prescription QR.', details: err.message });
    }
});

// GET /prescriptionQR
router.get('/prescriptionQR', async (req, res) => {
    try {
        // Get token from Authorization header: Bearer <token>
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization token missing or malformed.' });
        }
        const token = authHeader.split(' ')[1];

        // Decode JWT
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ error: 'Invalid or expired token.' });
        }

        const phoneNumber = decoded.PhoneNumber;
        if (!phoneNumber) {
            return res.status(400).json({ error: 'Phone number not found in token.' });
        }

        // Lazy load Prescription and PrescriptionQR models to avoid import issues
        const Prescription = require('../database/prescriptionDB');

        // Find all prescriptions with this phone number in patient.PhoneNumber
        const prescriptions = await Prescription.find({ 'patient.PhoneNumber': phoneNumber });

        // Find all QR records for this phone number
        const qrRecords = await PrescriptionQR.find({ PhoneNumber: phoneNumber });

        // Prepare response: all prescription details, and for each QR, show wallet address, QR image, and phone number
        res.status(200).json({
            prescriptions,
            prescriptionQRs: qrRecords.map(qr => ({
                patientWalletAddress: qr.patientWalletAddress,
                QRImg: qr.QRImg,
                PhoneNumber: qr.PhoneNumber
            }))
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch prescriptions and QR details.', details: err.message });
    }
});


module.exports = router;
