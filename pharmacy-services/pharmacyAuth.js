const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const web3 = require('web3');
const bcrypt = require('bcrypt');

require('dotenv').config();

require('../database/pharmacyDB.js');

const router = express.Router();
router.use(cors());
router.use(express.json());

const mongoURL = process.env.MONGOURL;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB (pharmacyAuth)");
    }  )
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

const Pharmacy = mongoose.model('pharmacyInfo');

router.get('/',(req,res)=>{
    return res.status(200).json({ message: "Pharmacy Auth Service is running" });   
});

router.post('/signin',async(req,res)=>{
    try{

        const{name,PhoneNumber,email,password,location,retailLicense} = req.body;
        if(!name || !PhoneNumber || !email || !password || !location || !retailLicense ){
            return res.status(400).json({message: "All fields are required !"});
        }
        const existingPharmacy = await Pharmacy.findOne({ email: email });
        if(existingPharmacy){
            return res.status(400).json({message: "Pharmacy already exists, please login"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPharmacy = new Pharmacy({
            name,
            PhoneNumber: PhoneNumber,
            email,
            password: hashedPassword,
            location,
            retailLicense
        });
        await newPharmacy.save();
        const token = jwt.sign({ name, PhoneNumber,email }, JWT_SECRET, { expiresIn: '1d' });
        return res.status(201).json({ message: "Pharmacy registered successfully", token });


    }catch(error){
        return res.status(500).json({message: "Internal server error",error:error.message});
    }
})

router.post('/login', async (req, res) => {
    const{ email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const pharmacy = await Pharmacy.findOne({ email }).select('+password');
        if (!pharmacy) {
            return res.status(404).json({ message: "Pharmacy not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, pharmacy.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }   
        const token = jwt.sign({ name: pharmacy.name, PhoneNumber: pharmacy.PhoneNumber, email: pharmacy.email }, JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
