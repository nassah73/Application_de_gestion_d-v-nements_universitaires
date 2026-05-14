const express = require('express');
const router = express.Router();
const administrateurController = require('../Controllers/AdministrateurController');

router.post('/create-administrateur', administrateurController.createAdministrateur);
router.post('/create-administration', administrateurController.createAdministration);
router.get('/administrateurs', administrateurController.getAllAdministrateurs);
router.get('/administrations', administrateurController.getAllAdministrations);
router.get('/administration/:id', administrateurController.getAdministrationById);
router.put('/administrateur/:id', administrateurController.updateAdministrateur);
router.put('/administration/:id', administrateurController.updateAdministration);
router.delete('/administrateur/:id', administrateurController.deleteAdministrateur);
router.delete('/administration/:id', administrateurController.deleteAdministration);

module.exports = router;
