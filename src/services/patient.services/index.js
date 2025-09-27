// Patient Services Entry Point
const patientAuthService = require('./auth.services');
const patientCoreService = require('./core.services');

module.exports = {
    patientAuthService,
    patientCoreService
};
