const Organisateur = require('../models/Organisateur');

exports.getPendingOrganizers = async (req, res) => {
    try {
        const all = await Organisateur.find({});
        res.status(200).json(all);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.validateOrganizer = async (req, res) => {
    try {
        const { id } = req.params;
        const organizer = await Organisateur.findByIdAndUpdate(id, { status: 'Validé' }, { new: true });
        
        if (!organizer) {
            return res.status(404).json({ message: "Organisateur non trouvé" });
        }
        
        res.status(200).json({ message: "Compte validé avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.rejectOrganizer = async (req, res) => {
    try {
        const { id } = req.params;
        const organizer = await Organisateur.findByIdAndUpdate(id, { status: 'Rejeté' }, { new: true });
        
        if (!organizer) {
            return res.status(404).json({ message: "Organisateur non trouvé" });
        }
        
        res.status(200).json({ message: "Compte rejeté avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};
