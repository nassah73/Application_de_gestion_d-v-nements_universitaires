const express = require('express');
const router = express.Router();
const Registration = require('../models/My_Events'); 

router.delete('/delete_registration/:id', async (req, res) => {
  try {
    const registrationId = req.params.id;

    const deletedDoc = await Registration.findByIdAndDelete(registrationId);

    if (!deletedDoc) {
      return res.status(404).json({ message: "Inscription non trouvée" });
    }

    res.status(200).json({ message: "Désinscription réussie" });
  } catch (error) {
    console.error("Error deleting registration:", error);
    res.status(500).json({ message: "Error in the server while deleting" });
  }
});

module.exports = router;