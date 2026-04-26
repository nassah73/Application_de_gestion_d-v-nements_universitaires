const Organisateur = require('../models/Organisateur');
const bcrypt = require('bcrypt');

exports.registerOrganisateur = async (req, res) => {
    try {
        const { prenom, nom, telephone, nomClub, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newOrganizer = new Organisateur({
            prenom,
            nom,
            telephone,
            nomClub,
            email,
            password: hashedPassword,
        });

        await newOrganizer.save();
        res.status(201).json({ message: "Compte créé. En attente de validation (72h)." });

    } catch (error) {
        res.status(400).json({ message: "Erreur lors de l'inscription", error: error.message });
    }
};
