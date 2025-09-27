const PrescriptionQR = require('../../models/prescriptionQR-DB');
const Prescription = require('../../models/prescriptionDB');
const { generateToken, verifyToken, extractTokenFromHeader } = require('../../utils/jwt');

const patientCoreService = {
    async createPrescriptionQR(qrData) {
        const { patientWalletAddress, QRImg, PhoneNumber } = qrData;

        if (!patientWalletAddress || !QRImg || !PhoneNumber) {
            throw new Error('Missing required fields.');
        }

        const newQR = new PrescriptionQR({
            patientWalletAddress,
            QRImg,
            PhoneNumber
        });

        const savedQR = await newQR.save();

        // Create a JWT for this QR
        const payload = {
            PhoneNumber: savedQR.PhoneNumber
        };
        const token = generateToken(payload);

        return { qr: savedQR, token };
    },

    async getPrescriptionQR(token) {
        const decoded = verifyToken(token);
        const phoneNumber = decoded.PhoneNumber;
        
        if (!phoneNumber) {
            throw new Error('Phone number not found in token.');
        }

        // Find all prescriptions with this phone number in patient.PhoneNumber
        const prescriptions = await Prescription.find({ 'patient.PhoneNumber': phoneNumber });

        // Find all QR records for this phone number
        const qrRecords = await PrescriptionQR.find({ PhoneNumber: phoneNumber });

        // Prepare response: all prescription details, and for each QR, show wallet address, QR image, and phone number
        return {
            prescriptions,
            prescriptionQRs: qrRecords.map(qr => ({
                patientWalletAddress: qr.patientWalletAddress,
                QRImg: qr.QRImg,
                PhoneNumber: qr.PhoneNumber
            }))
        };
    },

    async updatePatientDetails(patientData, token) {
        const decoded = verifyToken(token);
        const { name, PhoneNumber, email, patientID, dob, gender, address, otherDetails } = patientData;
        
        // Check for immutable fields - reject if user tries to change them
        if (PhoneNumber) {
            throw new Error('PhoneNumber cannot be modified. It is an immutable field.');
        }
        if (email) {
            throw new Error('Email cannot be modified. It is an immutable field.');
        }
        if (patientID) {
            throw new Error('PatientID cannot be modified. It is an immutable field.');
        }

        const Patient = require('../../models/patientDB');
        
        // Find patient by email from token
        const patient = await Patient.findOne({ email: decoded.email });
        if (!patient) {
            throw new Error('Patient not found.');
        }

        // Update only mutable fields if provided
        if (name) patient.name = name;
        if (dob) {
            // Convert DOB from DD/MM/YYYY to Date object if needed
            if (typeof dob === 'string' && dob.includes('/')) {
                const [day, month, year] = dob.split('/');
                patient.dob = new Date(`${year}-${month}-${day}`);
            } else {
                patient.dob = new Date(dob);
            }
        }
        if (gender) patient.gender = gender;
        if (address) patient.address = address;
        if (otherDetails !== undefined) patient.otherDetails = otherDetails;

        await patient.save();

        return {
            message: "Patient details updated successfully",
            patient: {
                patientID: patient.patientID,
                name: patient.name,
                PhoneNumber: patient.PhoneNumber,
                email: patient.email,
                dob: patient.dob,
                gender: patient.gender,
                address: patient.address,
                otherDetails: patient.otherDetails
            }
        };
    }
};

module.exports = patientCoreService;
