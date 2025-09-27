const patientAuthService = require('../services/patient.services/auth.services');

const patientAuthController = {
    async signup(req, res) {
        try {
            const result = await patientAuthService.signup(req.body);
            res.setHeader('Authorization', `Bearer ${result.token}`);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async login(req, res) {
        try {
            const result = await patientAuthService.login(req.body);
            res.setHeader('Authorization', `Bearer ${result.token}`);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
};

module.exports = patientAuthController;
