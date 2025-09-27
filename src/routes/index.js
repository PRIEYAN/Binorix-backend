const express = require('express');
const router = express.Router();

// Import all route modules
const doctorAuthRoutes = require('./doctor.auth.routes');
const doctorCoreRoutes = require('./doctor.core.routes');
const hospitalAuthRoutes = require('./hospital.auth.routes');
const hospitalCoreRoutes = require('./hospital.core.routes');
const patientAuthRoutes = require('./patient.auth.routes');
const patientCoreRoutes = require('./patient.core.routes');
const patientEditRoutes = require('./patient.edit.routes');
const pharmacyAuthRoutes = require('./pharmacy.auth.routes');
const pharmacyCoreRoutes = require('./pharmacy.core.routes');
const jwtRoutes = require('./jwt.routes');

// Mount routes
router.use('/doctor/auth', doctorAuthRoutes);
router.use('/doctor/prescription', doctorCoreRoutes);
router.use('/hospital/auth', hospitalAuthRoutes);
router.use('/hospital/core', hospitalCoreRoutes);
router.use('/patient/auth', patientAuthRoutes);
router.use('/patient/core', patientCoreRoutes);
router.use('/patient/edit-details', patientEditRoutes);
router.use('/pharmacy/auth', pharmacyAuthRoutes);
router.use('/pharmacy/core', pharmacyCoreRoutes);
router.use('/api/jwt', jwtRoutes);

module.exports = router;
