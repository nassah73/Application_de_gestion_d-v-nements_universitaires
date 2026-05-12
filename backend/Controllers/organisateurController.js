const Organisateur = require('../models/Organisateur');
const Student = require('../models/Student');
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
        console.log('=== registerOrganisateur called ===');
        console.log('req.body:', req.body);
        console.log('req.file:', req.file);
        console.log('err:', err);
        
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

// --- NOUVELLES FONCTIONNALITÉS POUR LES DEMANDES DE STAFF ---

// 1. L'étudiant envoie une demande pour rejoindre l'équipe
exports.sendStaffRequest = async (req, res) => {
    try {
        const { studentId, organizerId } = req.body;

        const organizer = await Organisateur.findById(organizerId);
        if (!organizer) {
            return res.status(404).json({ message: "Organisateur non trouvé." });
        }

        // Vérifier si déjà dans le staff
        const alreadyStaff = organizer.staff.find(s => s.student.toString() === studentId);
        if (alreadyStaff) {
            return res.status(400).json({ message: "Vous faites déjà partie de cette équipe." });
        }

        // Vérifier si une demande est déjà en attente
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

// 2. L'organisateur récupère ses demandes en attente
exports.getStaffRequests = async (req, res) => {
    try {
        const { organizerId } = req.params;
        const organizer = await Organisateur.findById(organizerId).populate('staffRequests.student');
        if (!organizer) {
            return res.status(404).json({ message: "Organisateur non trouvé." });
        }

        // Retourner seulement les demandes en attente
        const pendingRequests = organizer.staffRequests.filter(r => r.status === 'en attente');
        res.status(200).json(pendingRequests);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des demandes", error: error.message });
    }
};

// 3. L'organisateur accepte ou refuse une demande
exports.respondToStaffRequest = async (req, res) => {
    try {
        const { organizerId, studentId, action } = req.body; // action: 'accept' ou 'reject'

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
            // Mettre à jour le statut de la demande
            organizer.staffRequests[requestIndex].status = 'accepté';
            // Ajouter au staff
            organizer.staff.push({ student: studentId });
            await organizer.save();
            return res.status(200).json({ message: "Demande acceptée. L'étudiant fait maintenant partie de votre équipe." });
        } else if (action === 'reject') {
            // Mettre à jour le statut de la demande
            organizer.staffRequests[requestIndex].status = 'refusé';
            await organizer.save();
            return res.status(200).json({ message: "Demande refusée." });
        } else {
            return res.status(400).json({ message: "Action non valide. Utilisez 'accept' ou 'reject'." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors du traitement de la demande", error: error.message });
    }
};

// 4. Vérifier si un étudiant est staff (pour activer le scan)
exports.checkStaffStatus = async (req, res) => {
    try {
        const { studentId } = req.params;
        
        // Chercher si l'étudiant est dans le staff de n'importe quel organisateur
        const organizer = await Organisateur.findOne({ 'staff.student': studentId });
        
        if (organizer) {
            return res.status(200).json({ isStaff: true, organizerId: organizer._id, nomClub: organizer.nomClub });
        } else {
            return res.status(200).json({ isStaff: false });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la vérification du statut", error: error.message });
    }
};
