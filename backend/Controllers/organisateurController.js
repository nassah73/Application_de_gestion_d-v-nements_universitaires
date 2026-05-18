const Organisateur = require('../models/Organisateur');
const Student = require('../models/Student');
const Notification = require('../models/Notification');
const Registration = require('../models/My_Events');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('justificatif');

exports.registerOrganisateur = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).json({ message: "Erreur lors de l'upload du justificatif" });
        }

        try {
            const { prenom, nom, telephone, nomClub, email, password } = req.body;
            const justificatifPath = req.file ? req.file.path : null;

            if (!justificatifPath) {
                return res.status(400).json({ message: "Veuillez fournir un justificatif." });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newOrganizer = new Organisateur({
                prenom,
                nom,
                telephone,
                nomClub,
                email,
                password: hashedPassword,
                justificatif: justificatifPath,
            });

            await newOrganizer.save();
            res.status(201).json({ message: "Compte créé. En attente de validation par l'administration." });

        } catch (error) {
            console.error('Registration error:', error);
            res.status(400).json({ message: "Erreur lors de l'inscription", error: error.message });
        }
    });
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

        const alreadyStaff = organizer.staff.find(s => s.student.toString() === student._id.toString());
        if (alreadyStaff) {
            return res.status(400).json({ message: "Cet étudiant fait déjà partie de votre équipe." });
        }

        organizer.staff.push({ student: student._id });
        await organizer.save();

        const notification = new Notification({
            recipient: organizerId,
            title: "Membre ajouté",
            message: `L'étudiant ${student.prenom} ${student.nom} a été ajouté à votre équipe.`,
            type: 'system'
        });
        await notification.save();

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

exports.sendStaffRequest = async (req, res) => {
    try {
        const { studentId, organizerId } = req.body;

        const organizer = await Organisateur.findById(organizerId);
        if (!organizer) {
            return res.status(404).json({ message: "Organisateur non trouvé." });
        }

        const alreadyStaff = organizer.staff.find(s => s.student.toString() === studentId);
        if (alreadyStaff) {
            return res.status(400).json({ message: "Vous faites déjà partie de cette équipe." });
        }

        const alreadyRequested = organizer.staffRequests.find(
            r => r.student.toString() === studentId && r.status === 'en attente'
        );
        if (alreadyRequested) {
            return res.status(400).json({ message: "Une demande est déjà en attente." });
        }

        organizer.staffRequests.push({ student: studentId, status: 'en attente' });
        await organizer.save();

        res.status(200).json({ message: "Demande envoyée avec succès !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'envoi de la demande", error: error.message });
    }
};

exports.getStaffRequests = async (req, res) => {
    try {
        const { organizerId } = req.params;
        const organizer = await Organisateur.findById(organizerId).populate('staffRequests.student');
        if (!organizer) {
            return res.status(404).json({ message: "Organisateur non trouvé." });
        }

        const pendingRequests = organizer.staffRequests.filter(r => r.status === 'en attente');
        res.status(200).json(pendingRequests);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des demandes", error: error.message });
    }
};

exports.respondToStaffRequest = async (req, res) => {
    try {
        const { organizerId, studentId, action } = req.body;

        const organizer = await Organisateur.findById(organizerId);
        if (!organizer) {
            return res.status(404).json({ message: "Organisateur non trouvé." });
        }

        const requestIndex = organizer.staffRequests.findIndex(
            r => r.student.toString() === studentId && r.status === 'en attente'
        );

        if (requestIndex === -1) {
            return res.status(404).json({ message: "Demande non trouvée ou déjà traitée." });
        }

        if (action === 'accept') {
            organizer.staffRequests[requestIndex].status = 'accepté';
            organizer.staff.push({ student: studentId });
            await organizer.save();

            // Mettre à jour l'inscription de l'étudiant en tant que volontaire (approved)
            await Registration.findOneAndUpdate(
                { student: studentId, role: 'volunteer', status: 'pending' },
                { status: 'approved' },
                { sort: { registrationDate: -1 } }
            );

            const student = await Student.findById(studentId);
            
            const notification = new Notification({
                recipient: organizerId,
                title: "Demande de staff acceptée",
                message: `Vous avez accepté la demande de ${student ? student.prenom + ' ' + student.nom : 'un étudiant'} pour rejoindre votre équipe.`,
                type: 'registration'
            });
            await notification.save();

            return res.status(200).json({ message: "Demande acceptée." });
        } else if (action === 'reject') {
            organizer.staffRequests[requestIndex].status = 'refusé';
            await organizer.save();

            const student = await Student.findById(studentId);

            const notification = new Notification({
                recipient: organizerId,
                title: "Demande de staff refusée",
                message: `Vous avez refusé la demande de ${student ? student.prenom + ' ' + student.nom : 'un étudiant'}.`,
                type: 'registration'
            });
            await notification.save();

            return res.status(200).json({ message: "Demande refusée." });
        } else {
            return res.status(400).json({ message: "Action non valide." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors du traitement", error: error.message });
    }
};

exports.checkStaffStatus = async (req, res) => {
    try {
        const { studentId } = req.params;
        const organizer = await Organisateur.findOne({ 'staff.student': studentId });
        
        if (organizer) {
            return res.status(200).json({ isStaff: true, organizerId: organizer._id, nomClub: organizer.nomClub });
        } else {
            return res.status(200).json({ isStaff: false });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const organizer = await Organisateur.findById(id).select('-password');
        if (!organizer) {
            return res.status(404).json({ message: "Organisateur non trouvé." });
        }
        res.status(200).json(organizer);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { prenom, nom, telephone, nomClub, email, currentPassword, newPassword } = req.body;

        const organizer = await Organisateur.findById(id);
        if (!organizer) {
            return res.status(404).json({ message: "Organisateur non trouvé." });
        }

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, organizer.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Mot de passe actuel incorrect." });
            }
            organizer.password = await bcrypt.hash(newPassword, 10);
        }

        if (prenom) organizer.prenom = prenom;
        if (nom) organizer.nom = nom;
        if (telephone) organizer.telephone = telephone;
        if (nomClub) organizer.nomClub = nomClub;
        if (email) organizer.email = email;

        await organizer.save();
        
        const updatedOrganizer = organizer.toObject();
        delete updatedOrganizer.password;
        
        res.status(200).json({ message: "Profil mis à jour avec succès !", user: updatedOrganizer });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
    }
};
