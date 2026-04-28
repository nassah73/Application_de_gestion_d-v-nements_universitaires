const express = require('express');
const router = express.Router();
const organisateurController = require('../Controllers/organisateurController');


router.post('/register', organisateurController.registerOrganisateur);
router.post('/add-staff', organisateurController.addStaff);
router.get('/staff/:organizerId', organisateurController.getStaff);
router.delete('/staff/:organizerId/:studentId', organisateurController.removeStaff);

module.exports = router;