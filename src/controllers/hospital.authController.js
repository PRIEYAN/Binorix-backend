const hospitalAuthService = require('../services/hospital.services/auth.services');

const hospitalAuthController = {
    async signup(req, res) {
        try {
            const result = await hospitalAuthService.signup(req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(409).json({ message: error.message });
        }
    },

    async login(req, res) {
        try {
            const result = await hospitalAuthService.login(req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
};

module.exports = hospitalAuthController;
