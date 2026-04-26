const Student = require('../models/Student');
const Organisateur = require('../models/Organisateur');
const Administrateur = require('../models/Administrateur');
const Administration = require('../models/Administration');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await Student.findOne({ email });
        let role = 'student';

        if (!user) {
            user = await Organisateur.findOne({ email });
            role = 'organizer';
            if (user && user.status === 'En attente') {
                return res.status(403).json({ 
                    message: "Votre compte est en attente de validation par l'administration (72h)."
                });
            }
        }
        if (!user) {
            user = await Administrateur.findOne({ email });
            role = 'admin';
        }
        if (!user) {
            user = await Administration.findOne({ email });
            role = 'administration';
        }

        if (!user) {
            return res.status(404).json({ message: "Email incorrect" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }
        
        res.status(200).json({
            message: "Bienvenue",
            role: role, 
            user: user
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
