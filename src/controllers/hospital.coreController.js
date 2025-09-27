const hospitalCoreService = require('../services/hospital.services/core.services');

const hospitalCoreController = {
    async getDoctorDetails(req, res) {
        try {
            const { name } = req.body;
            const result = await hospitalCoreService.getDoctorDetails(name);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    async viewPrescriptions(req, res) {
        try {
            const { doctorWallet } = req.params;
            const result = await hospitalCoreService.viewPrescriptions(doctorWallet);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
};

module.exports = hospitalCoreController;
