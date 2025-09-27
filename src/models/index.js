// Models Entry Point
const Doctor = require('./doctorDB');
const Hospital = require('./hospitalDB');
const Patient = require('./patientDB');
const Pharmacy = require('./pharmacyDB');
const Prescription = require('./prescriptionDB');
const PrescriptionQR = require('./prescriptionQR-DB');

module.exports = {
    Doctor,
    Hospital,
    Patient,
    Pharmacy,
    Prescription,
    PrescriptionQR
};
