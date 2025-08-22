const mongoose = require('mongoose');

function genPatientId() {
    const chars = '0123456789';
    let id = 'ZR';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

const patientSchema = new mongoose.Schema({
    patientID: { type: String, required: true, unique: true, default: genPatientId },
    name: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    otherDetails: { type: String } // optional
}, { collection: "patientInfo" });

const Patient = mongoose.model('patientInfo', patientSchema);

module.exports = Patient;
