const express = require('express'); 
const jwt = require('jsonwebtoken');    
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const router = express.Router();
router.use(cors());
router.use(express.json());
const mongoURL = process.env.MONGOURL;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB (jwt)");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    }   
);  

// const Doctor = require('../database/doctorDB.js');// 1
// const patient =require('../database/patientDB.js');// 2
// const Pharmacy = require('../database/pharmacyDB.js');// 3
// const hospital = require('../database/hospitalDB.js');// 4
// const presecription = require('../database/prescriptionDB.js');// 5

router.post('/:role', async (req, res) => {
    const { role } = req.params;
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({
            message: "JWT decoded successfully",
            role,
            payload: decoded
        });

    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
});


module.exports = router;