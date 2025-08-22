const { randomUUID } = require('crypto');
const e = require('express');
const mongoose = require('mongoose');

function genPrescription() {
    const chars = '0123456789';
    let id = 'ZRP';
    for (let i = 0; i < 4; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

const prescriptionSchema = new mongoose.Schema({
    prescrptionID: {
        type: String,
        required: true,
        default : genPrescription,
        unique: true,
    },
    doctorWallet: { type: String, required: true },
    patientWallet: { type: String, required: true },
    doctor: {
        name: { type: String, required: true },
        nmrNumber: { type: String, required: true },
        specialization: { type: String, required: true },
        email: { type: String, required: true },
        hospitalName: { type: String, required: true },
        hospital: { type: String, required: true }
    },
    patient: {
        name: { type: String, required: true },
        PhoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        gender: { type: String, required: true },

    },
    medicines: [{
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        timing: {
            morning: { type: Boolean, required: true },
            afternoon: { type: Boolean, required: true },
            night: { type: Boolean, required: true }
        },
        foodIntake: { type: String, required: true },
        instructions: { type: String, required: true }
    }],
    advice: { type: String },
    status: { type: String, required: true }, // pending, fulfilled
    CreatedDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
}, { collection: "prescriptionDetails" });

const Prescription = mongoose.model('prescriptionDetails', prescriptionSchema);
module.exports = Prescription;


/*{
  "patient": {
    "name": "John Doe",
    "phoneNumber": "+91 9876543210",
    "email": "john@example.com",
    "gender": "Male",
  },
  "doctor": {
    "name": "Dr. Smith",
    "nmrNumber": "NMR12345",
    "hospital": "City Hospital",
    "specialization": "Cardiology",
    "email": "doctor@hospital.com"
  },
  "medicines": [
    {
      "name": "Paracetamol",
      "quantity": "10",
      "timing": {
        "morning": true,
        "afternoon": false,
        "night": true
      },
      "foodIntake": "After Food",
      "instructions": "Take after food"
    }
  ],
  "advice": "Doctor's advice and instructions",
  "signature": {
    "walletAddress": "0x1234...abcd",
    "timestamp": "2024-01-15 14:30:00",
    "signedMessage": "Complete signed message"
  },
  "status": "processing",
  "prescriptionId": "RX123456",
  "createdAt": "2024-01-15T14:30:00.000Z",
  "updatedAt": "2024-01-15T14:30:00.000Z"
} */