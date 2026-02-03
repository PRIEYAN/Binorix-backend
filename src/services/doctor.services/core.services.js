const Doctor = require('../../models/doctorDB');
const Prescription = require('../../models/prescriptionDB');
const Patient = require('../../models/patientDB');

const doctorCoreService = {
    async getPatientDetails(PhoneNumber) {
        if (!PhoneNumber) {
            throw new Error("PhoneNumber is required");
        }

        const existingPatient = await Patient.findOne({ PhoneNumber });

        if (!existingPatient) {
            throw new Error("Patient not found, register first");
        }

        return {
            message: "Patient details fetched successfully",
            patient: existingPatient
        };
    },

    async createPrescription(prescriptionData) {
        const {
            doctorWallet,
            patientWallet,
            doctorName,
            doctorPhoneNumber,
            doctorHospital,
            doctorSpecialization,
            doctorEmail,
            patientName,
            patientPhoneNumber,
            patientEmail,
            patientGender,
            medicines,
            advice,
        } = prescriptionData;

        // Validate required fields
        const requiredFields = [
            'doctorWallet', 'patientWallet', 'doctorName', 'doctorPhoneNumber',
            'doctorHospital', 'doctorSpecialization', 'doctorEmail', 'patientName',
            'patientPhoneNumber', 'patientEmail', 'patientGender', 'medicines'
        ];

        for (const field of requiredFields) {
            if (!prescriptionData[field]) {
                throw new Error(`${field} is required`);
            }
        }

        if (!Array.isArray(medicines) || medicines.length === 0) {
            throw new Error("medicines must be a non-empty array");
        }

        // Validate medicines array structure
        for (const medicine of medicines) {
            if (
                !medicine.name ||
                !medicine.quantity ||
                !medicine.timing ||
                !medicine.foodIntake ||
                !medicine.instructions ||
                typeof medicine.timing.morning !== 'boolean' ||
                typeof medicine.timing.afternoon !== 'boolean' ||
                typeof medicine.timing.night !== 'boolean'
            ) {
                throw new Error(`Medicine '${medicine.name || 'unknown'}' is missing required fields`);
            }
        }

        const newPrescription = new Prescription({
            doctorWallet,
            patientWallet,
            doctor: {
                name: doctorName,
                nmrNumber: doctorPhoneNumber,
                specialization: doctorSpecialization,
                hospitalName: doctorHospital,
                hospital: doctorHospital,
                email: doctorEmail
            },
            patient: {
                name: patientName,
                PhoneNumber: patientPhoneNumber,
                email: patientEmail,
                gender: patientGender
            },
            medicines: medicines,
            advice: advice || '',
            status: 'processing',
        });

        await newPrescription.save();
        return { message: "Prescription created successfully", prescription: newPrescription };
    },

    async uploadPrescriptionImage(prescriptionId, imageUrl) {
        if (!prescriptionId || !imageUrl) {
            throw new Error("Prescription ID and image URL are required");
        }

        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            throw new Error("Prescription not found");
        }

        prescription.ORImage = imageUrl;
        await prescription.save();
        return { message: "Image uploaded successfully", prescription };
    },

    async getPrescriptionDetails(doctorWallet) {
        if (!doctorWallet) {
            throw new Error("Doctor wallet address is required");
        }

        const prescriptions = await Prescription.find({ doctorWallet: doctorWallet });
        if (prescriptions.length === 0) {
            throw new Error("No prescriptions found for this doctor");
        }

        return { message: "Prescriptions fetched successfully", prescriptions };
    },

    async completePrescription(prescriptionId) {
        if (!prescriptionId) {
            throw new Error("Prescription ID is required");
        }

        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            throw new Error("Prescription not found");
        }

        prescription.status = 'completed';
        prescription.updatedDate = new Date();
        await prescription.save();

        return { message: "Prescription completed successfully", prescription };
    },

    async approvePrescriptionRequest(prescriptionId) {
        if (!prescriptionId) {
            throw new Error("Prescription ID is required");
        }

        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            throw new Error("Prescription not found");
        }

        prescription.status = 'approved';
        prescription.updatedDate = new Date();
        await prescription.save();

        return { message: "Prescription request approved successfully", prescription };
    },

    async getPrescription(patientPhoneNumber, jwtTokenData) {
        if (!patientPhoneNumber) {
            throw new Error("Patient phone number is required");
        }

        if (!jwtTokenData || !jwtTokenData.PhoneNumber) {
            throw new Error("Invalid JWT token - patient phone number not found");
        }

        // Get patient ID from JWT token by looking up patient using PhoneNumber from token
        const patientFromToken = await Patient.findOne({ PhoneNumber: jwtTokenData.PhoneNumber });
        if (!patientFromToken) {
            throw new Error("Patient not found in token");
        }

        const patientID = patientFromToken.patientID;

        // Get patient details using the mobile number from request
        const patient = await Patient.findOne({ PhoneNumber: patientPhoneNumber });
        if (!patient) {
            throw new Error("Patient not found with the provided phone number");
        }

        // Get prescriptions for this patient using patientWallet (assuming it's the patientID or PhoneNumber)
        // Check prescription schema - it uses patientWallet, so we need to find by patient.PhoneNumber
        const prescriptions = await Prescription.find({ 'patient.PhoneNumber': patientPhoneNumber });

        return {
            message: "Patient details and prescriptions fetched successfully",
            patientID: patientID,
            patient: patient,
            prescriptions: prescriptions
        };
    }
};

module.exports = doctorCoreService;
