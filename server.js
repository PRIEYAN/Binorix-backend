// Main Server Entry Point
const app = require('./src');

const PORT = 5050;
app.listen(PORT, '0.0.0.0', () => {
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
http://localhost:5050/doctor/prescription/completedPrescription - to reject a prescription

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
http://localhost:5050/patient/core/prescriptionQR
http://localhost:5050/patient/edit-details

JWT ROUTES
http://localhost:5050/api/jwt/:ROLE
*/


