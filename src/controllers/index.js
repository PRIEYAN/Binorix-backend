// Controllers Entry Point
const doctorAuthController = require('./doctor.authController');
const doctorCoreController = require('./doctor.coreController');
const hospitalAuthController = require('./hospital.authController');
const hospitalCoreController = require('./hospital.coreController');
const patientAuthController = require('./patient.authController');
const patientCoreController = require('./patient.coreController');
const pharmacyAuthController = require('./pharmacy.authController');
const pharmacyCoreController = require('./pharmacy.coreController');

module.exports = {
    doctorAuthController,
    doctorCoreController,
    hospitalAuthController,
    hospitalCoreController,
    patientAuthController,
    patientCoreController,
    pharmacyAuthController,
    pharmacyCoreController
};
