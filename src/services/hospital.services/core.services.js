const Doctor = require('../../models/doctorDB');
const Hospital = require('../../models/hospitalDB');
const Prescription = require('../../models/prescriptionDB');

const hospitalCoreService = {
    async getDoctorDetails(hospitalName) {
        if (!hospitalName) {
            throw new Error("Hospital Name is required");
        }

        const DoctorDetails = await Doctor.find({ hospital: hospitalName });
        if (DoctorDetails.length === 0) {
            throw new Error("No doctors found for this hospital");
        }

        return { message: "Doctor details fetched successfully", DoctorDetails };
    },

    async viewPrescriptions(doctorWallet) {
        if (!doctorWallet) {
            throw new Error("Doctor wallet address is required");
        }

        const prescriptions = await Prescription.find({ doctorWallet: doctorWallet });
        if (prescriptions.length === 0) {
            throw new Error("No prescriptions found for this doctor");
        }

        return { message: "Prescriptions fetched successfully", prescriptions };
    }
};

module.exports = hospitalCoreService;
