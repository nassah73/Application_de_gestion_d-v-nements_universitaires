const express= require('express')
const router = express.Router();
const StudentController = require('../Controllers/studentController');
const User = require('../models/Student');

router.post('/register', StudentController.registerStudent);

router.get('/user-info/:id', async (req, res) => {
    try {
      
        const student = await User.findById(req.params.id).select('fullName email role'); 
        
        if (!student) {
            return res.status(404).json({ message: "Étudiant non trouvé" });
        }

        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});
module.exports = router;