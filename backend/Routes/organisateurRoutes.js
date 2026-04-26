const express = require('express');
const router = express.Router();
const organisateurController = require('../Controllers/organisateurController');


router.post('/register', organisateurController.registerOrganisateur);

module.exports = router;