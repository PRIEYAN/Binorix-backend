const doctorAuthService = require('../services/doctor.services/auth.services');

const doctorAuthController = {
    async signup(req, res) {
        try {
            const result = await doctorAuthService.signup(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async login(req, res) {
        try {
            const result = await doctorAuthService.login(req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async getHospitals(req, res) {
        try {
            const result = await doctorAuthService.getHospitals();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async getDoctorDetails(req, res) {
        try {
            const { token } = req.body;
            const result = await doctorAuthService.getDoctorDetails(token);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async logout(req, res) {
        return res.status(200).json({ message: "Logout successful" });
    }
};

module.exports = doctorAuthController;
