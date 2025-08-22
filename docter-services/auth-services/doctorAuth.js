const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

require('../../database/doctorDB.js'); 
require('../../database/hospitalDB.js')

const router = express.Router();
router.use(cors());
router.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

const Doctor = mongoose.model('doctorInfo');
const Hospital = mongoose.model('hospitalInfo');

router.get('/', (req, res) => {
    return res.status(200).json({ message: "Doctor Auth Service is running" });
}); 

//doctor registration
router.post('/signin',async(req,res)=>{
    try{
        const{name , PhoneNumber , email , NMR_Number , password, hospital , specialization,availability } = req.body;
        if(!name || !PhoneNumber || !email || !NMR_Number || !password || !hospital || !specialization || !availability){
            return res.status(400).json({message: "All fields are required..."});
        }
        const existingDoctor = await Doctor.findOne({ email: email, hospital: hospital });
        if(existingDoctor){
            return res.status(400).json({message: "Doctor already exists, please login"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({
            name,
            PhoneNumber: PhoneNumber,
            email,
            nmrNumber: NMR_Number,
            password: hashedPassword,
            hospital,
            specialization,
            availability: availability,
            createdAt: new Date()
        });
        await newDoctor.save();
        
        const token = jwt.sign({ PhoneNumber, email }, JWT_SECRET, { expiresIn: '1d' });
        return res.status(201).json({ message: "Doctor registered successfully", token });
    }catch(error){
        return res.status(500).json({message: "Internal server error",error:error.message});
    }
});
//doctor login
router.post('/login', async (req, res) => {
    try {
        const { email, password , hospitalName} = req.body;
        if (!email || !password || !hospitalName) {
            return res.status(400).json({ message: "All fields are required" });
        }
        existingDoctor = await Doctor.findOne({ email: email, hospital: hospitalName });
        if (!existingDoctor) {
            return res.status(400).json({ message: "Doctor not found or hospital name does not match" });
        }
        const doctor = await Doctor.findOne({ email }).select('+password');
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, doctor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const PhoneNumber = doctor.PhoneNumber;
        const token = jwt.sign({  PhoneNumber,email }, JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/getHospital', async (req, res) => {
  try {
    const hospitalNames = await Hospital.find({}, { name: 1, _id: 0 });

    return res.status(200).json({
      message: "Hospital names fetched successfully",
      hospitalNames
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


router.post('/getDoctorDetails', async (req, res) => {
    try {
        const{token}=req.body;
        decode = jwt.verify(token, JWT_SECRET);
        if(!decode){
            return res.status(500).json({message:"invalid token"})
        }
        const doctorDetails = await Doctor.findOne({email:decode.email});
        if(!doctorDetails){
            return res.status(500).json({message:"no doctors found"});
        }
        return res.status(200).json({message:"Doctor found !",doctor:doctorDetails})
    }catch(err){
        return res.status(500).json({message:err.message});
    }
});

router.use('/logout', (req, res) => {
    return res.status(200).json({ message: "Logout successful" });
});

module.exports = router;