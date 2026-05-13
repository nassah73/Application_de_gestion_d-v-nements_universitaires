const Event_db = require('../models/Event');
const Notification = require('../models/Notification');

const valideEvent = async (req, res) => {
    try {
        const { id } = req.params; 
        
        // كنقلبو ونحدثو الحالة ف دقة وحدة
        const event = await Event_db.findByIdAndUpdate(
            id, 
            { status: 'approved' },
            { new: true } 
        );

        if (!event) {
            return res.status(404).json({ message: "Event non trouvé" });
        }

        // Créer une notification pour l'organisateur
        const notification = new Notification({
            recipient: event.organizer,
            title: "Événement validé",
            message: `Votre événement "${event.title}" a été validé par l'administration.`,
            type: 'event_status',
            relatedEvent: id
        });
        await notification.save();

        res.status(200).json({ message: "Event validé avec succès", event });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

const rejectEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        
        const event = await Event_db.findByIdAndUpdate(
            id, 
            { status: 'rejected', rejectionReason: reason },
            { new: true } 
        );

        if (!event) {
            return res.status(404).json({ message: "Event non trouvé" });
        }

        // Créer une notification pour l'organisateur
        const notification = new Notification({
            recipient: event.organizer,
            title: "Événement refusé",
            message: `Votre événement "${event.title}" a été refusé par l'administration. Motif: ${reason || 'Non spécifié'}`,
            type: 'event_status',
            relatedEvent: id
        });
        await notification.save();

        res.status(200).json({ message: "Event refusé avec succès", event });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

const requestModification = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        
        const event = await Event_db.findByIdAndUpdate(
            id, 
            { status: 'modification_requested', rejectionReason: message },
            { new: true } 
        );

        if (!event) {
            return res.status(404).json({ message: "Event non trouvé" });
        }

        // Créer une notification pour l'organisateur
        const notification = new Notification({
            recipient: event.organizer,
            title: "Modification demandée",
            message: `L'administration a demandé une modification pour votre événement "${event.title}". Message: ${message}`,
            type: 'event_status',
            relatedEvent: id
        });
        await notification.save();

        res.status(200).json({ message: "Demande de modification envoyée", event });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

module.exports = { valideEvent, rejectEvent, requestModification };