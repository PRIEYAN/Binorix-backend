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
    status: { type: String, required: true }, // processing, completed
    CreatedDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
}, { collection: "prescriptionDetails" });

const Prescription = mongoose.model('prescriptionDetails', prescriptionSchema);
module.exports = Prescription;


