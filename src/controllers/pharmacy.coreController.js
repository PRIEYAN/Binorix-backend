const pharmacyCoreService = require('../services/pharmacy.services/core.services');

const pharmacyCoreController = {
    async getPharmacyDetails(req, res) {
        try {
            const { pharmacyId } = req.params;
            const result = await pharmacyCoreService.getPharmacyDetails(pharmacyId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
};

module.exports = pharmacyCoreController;
