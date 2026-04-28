const Organisateur = require('../models/Organisateur');
const Student = require('../models/Student');
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

exports.addStaff = async (req, res) => {
    try {
        const { organizerId, studentEmail } = req.body;
        
        const student = await Student.findOne({ email: studentEmail });
        if (!student) {
            return res.status(404).json({ message: "Étudiant non trouvé avec cet email académique." });
        }

        const organizer = await Organisateur.findById(organizerId);
        if (!organizer) {
            return res.status(404).json({ message: "Organisateur non trouvé." });
        }

        // Vérifier si déjà dans le staff
        const alreadyStaff = organizer.staff.find(s => s.student.toString() === student._id.toString());
        if (alreadyStaff) {
            return res.status(400).json({ message: "Cet étudiant fait déjà partie de votre équipe." });
        }

        organizer.staff.push({ student: student._id });
        await organizer.save();

        res.status(200).json({ message: "Assistant ajouté avec succès !", staffMember: student });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout du staff", error: error.message });
    }
};

exports.getStaff = async (req, res) => {
    try {
        const { organizerId } = req.params;
        const organizer = await Organisateur.findById(organizerId).populate('staff.student');
        if (!organizer) {
            return res.status(404).json({ message: "Organisateur non trouvé." });
        }
        res.status(200).json(organizer.staff);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'équipe", error: error.message });
    }
};

exports.removeStaff = async (req, res) => {
    try {
        const { organizerId, studentId } = req.params;
        const organizer = await Organisateur.findById(organizerId);
        
        if (!organizer) {
            return res.status(404).json({ message: "Organisateur non trouvé." });
        }

        organizer.staff = organizer.staff.filter(s => s.student.toString() !== studentId);
        await organizer.save();

        res.status(200).json({ message: "Assistant révoqué avec succès." });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du staff", error: error.message });
    }
};
