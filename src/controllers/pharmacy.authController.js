const pharmacyAuthService = require('../services/pharmacy.services/auth.services');

const pharmacyAuthController = {
    async signup(req, res) {
        try {
            const result = await pharmacyAuthService.signup(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async login(req, res) {
        try {
            const result = await pharmacyAuthService.login(req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
};

module.exports = pharmacyAuthController;
