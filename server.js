const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB once at the application level
const mongoURL = process.env.MONGOURL;
mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

const doctorAuth = require('./docter-services/auth-services/doctorAuth.js');
const prescription = require('./docter-services/doctor-core-services/prescription.js');
const hospitalAuth = require('./hospital-services/hospitalAuth.js');
const hospitalCore = require('./hospital-services/hospitalCore.js');
const pharmacyAuth = require('./pharmacy-services/pharmacyAuth.js');
const pharmacyCore = require('./pharmacy-services/pharmacyCore.js');
const patientAuth = require('./patient-services/patientAuth.js');
const jwt = require('./jwt/jwt.js');


const app = express();
app.use(cors());
app.use(express.json());

//doctor
app.use('/doctor/auth', doctorAuth);
app.use('/doctor/prescription',prescription);

//hospital
app.use('/hospital/auth', hospitalAuth);
app.use('/hospital/core', hospitalCore);

//pharmacy
app.use('/pharmacy/auth', pharmacyAuth);
app.use('/pharmacy/core', pharmacyCore);

//patient
app.use('/patient/auth', patientAuth);

//jwt
app.use('/api/jwt', jwt);


app.get('/', (req, res) => {
    return res.status(200).json({ message: "App running" });
});

const PORT = 5050;
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});


/*
DOCTOR ROUTES

http://localhost:5050/doctor/auth/signin
http://localhost:5050/doctor/auth/login
http://localhost:5050/doctor/auth/getDoctorDetails
http://localhost:5050/doctor/auth/logout


http://localhost:5050/doctor/prescription/getPatientDetails - to get check whether the patient registered in app or not
http://localhost:5050/doctor/prescription/newPrescription - to create new prescription

http://localhost:5050/doctor/prescription/getPrescriptionDetails - to get all prescription details of a doctor
http://localhost:5050/doctor/prescription/rejectPrescription - to reject a prescription

http://localhost:5050/doctor/prescription/prescriptionRequest - to approve a prescription request


HOSPITAL ROUTES

http://localhost:5050/hospital/auth/signin
http://localhost:5050/hospital/auth/login
http://localhost:5050/hospital/core/getDoctorDetails - to get all doctors of a hospital
http://localhost:5050/hospital/core/viewPrescription/:doctorWallet - to view all prescriptions
http://localhost:5050/hospital/auth/getHospital - to get all hospitals



PHARMACY ROUTES
http://localhost:5050/pharmacy/auth/signin
http://localhost:5050/pharmacy/auth/login



PATIENT ROUTES
http://localhost:5050/patient/auth/signin
http://localhost:5050/patient/auth/login


JWT ROUTES
http://localhost:5050/api/jwt/:ROLE
*/