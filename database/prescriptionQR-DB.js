const mongoose = require('mongoose');

const prescriptionQRSchema = new mongoose.Schema({
    patientWalletAddress: { type: String, required: true },
    QRImg: { type: String, required: true },
    PhoneNumber: { type: String, required: true }
}, { collection: "prescriptionQR" });

const PrescriptionQR = mongoose.model('prescriptionQR', prescriptionQRSchema);

module.exports = PrescriptionQR;
