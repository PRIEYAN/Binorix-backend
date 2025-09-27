const doctorCoreService = require('../services/doctor.services/core.services');

const doctorCoreController = {
    async getPatientDetails(req, res) {
        try {
            const { PhoneNumber } = req.body;
            const result = await doctorCoreService.getPatientDetails(PhoneNumber);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    async createPrescription(req, res) {
        try {
            const result = await doctorCoreService.createPrescription(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async uploadPrescriptionImage(req, res) {
        try {
            const { prescriptionId, imageUrl } = req.body;
            const result = await doctorCoreService.uploadPrescriptionImage(prescriptionId, imageUrl);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async getPrescriptionDetails(req, res) {
        try {
            const { doctorWallet } = req.params;
            const result = await doctorCoreService.getPrescriptionDetails(doctorWallet);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    async completePrescription(req, res) {
        try {
            const { prescriptionId } = req.body;
            const result = await doctorCoreService.completePrescription(prescriptionId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async approvePrescriptionRequest(req, res) {
        try {
            const { prescriptionId } = req.body;
            const result = await doctorCoreService.approvePrescriptionRequest(prescriptionId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
};

module.exports = doctorCoreController;
