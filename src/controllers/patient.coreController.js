const patientCoreService = require('../services/patient.services/core.services');
const { extractTokenFromHeader } = require('../utils/jwt');

const patientCoreController = {
    async createPrescriptionQR(req, res) {
        try {
            const result = await patientCoreService.createPrescriptionQR(req.body);
            res.setHeader('Authorization', `Bearer ${result.token}`);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getPrescriptionQR(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            const token = extractTokenFromHeader(authHeader);
            
            if (!token) {
                return res.status(401).json({ error: 'Authorization token missing or malformed.' });
            }

            const result = await patientCoreService.getPrescriptionQR(token);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    },

    async updatePatientDetails(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            const token = extractTokenFromHeader(authHeader);
            
            if (!token) {
                return res.status(401).json({ error: 'Authorization token missing or malformed.' });
            }

            const result = await patientCoreService.updatePatientDetails(req.body, token);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};

module.exports = patientCoreController;
