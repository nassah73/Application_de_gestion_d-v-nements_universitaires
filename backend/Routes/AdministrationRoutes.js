const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/AdministrationController');

router.get('/pending-organizers', adminController.getPendingOrganizers);
router.put('/validate/:id', adminController.validateOrganizer);
router.put('/reject/:id', adminController.rejectOrganizer);
router.delete('/delete-organizer/:id', adminController.deleteOrganizer);

module.exports = router;
