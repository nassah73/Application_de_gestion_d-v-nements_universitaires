const express = require('express');
const router = express.Router();
const organisateurController = require('../Controllers/organisateurController');


router.post('/register', organisateurController.registerOrganisateur);
router.post('/add-staff', organisateurController.addStaff);
router.get('/staff/:organizerId', organisateurController.getStaff);
router.delete('/staff/:organizerId/:studentId', organisateurController.removeStaff);

// Nouvelles routes pour les demandes de staff
router.post('/request-staff', organisateurController.sendStaffRequest);
router.get('/staff-requests/:organizerId', organisateurController.getStaffRequests);
router.post('/respond-staff-request', organisateurController.respondToStaffRequest);
router.get('/check-staff-status/:studentId', organisateurController.checkStaffStatus);
router.get('/check-staff/:studentId', organisateurController.checkStaffStatus); // Alias demandé par l'utilisateur

module.exports = router;