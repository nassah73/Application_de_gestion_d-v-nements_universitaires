const Organisateur = require('../models/Organisateur');
const Notification = require('../models/Notification');

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

        // Notification pour l'organisateur
        const notification = new Notification({
            recipient: id,
            title: "Compte validé",
            message: "Votre compte organisateur a été validé. Vous pouvez maintenant créer des événements.",
            type: 'system'
        });
        await notification.save();
        
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

        // Notification pour l'organisateur
        const notification = new Notification({
            recipient: id,
            title: "Compte rejeté",
            message: "Votre demande de compte organisateur a été rejetée par l'administration.",
            type: 'system'
        });
        await notification.save();
        
        res.status(200).json({ message: "Compte rejeté avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.deleteOrganizer = async (req, res) => {
    try {
        const { id } = req.params;
        const organizer = await Organisateur.findByIdAndDelete(id);
        
        if (!organizer) {
            return res.status(404).json({ message: "Organisateur non trouvé" });
        }
        
        res.status(200).json({ message: "Demande supprimée avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};
