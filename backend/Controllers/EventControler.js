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

const upload = multer({ storage: storage }).single('coverImage');

const Event = require('../models/Event');

const CreateEvent = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de l'upload de l'image" });
        }

        try {
            const { title, category, capacity, date, location, registrationLink, description, organizer } = req.body;

            const newEvent = new Event({
                title,
                category,
                capacity: Number(capacity),
                date,
                location,
                registrationLink,
                description,
                organizer,
                coverImage: req.file ? req.file.path : null
            });

            await newEvent.save();

            res.status(201).json({ 
                message: "Evenement cree avec succes! En attente de validation.",
                event: newEvent 
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur serveur lors de la creation de l'evenement" });
        }
    });
};

const GetOrganizerEvents = async (req, res) => {
    try {
        const { organizerId } = req.params;
        const events = await Event.find({ organizer: organizerId }).sort({ createdAt: -1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recuperation des evenements" });
    }
};

const MarkAttendance = async (req, res) => {
    try {
        const { eventId, studentId } = req.body;
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Evenement non trouve" });

        const participant = event.participants.find(p => p.student.toString() === studentId);
        if (!participant) {
            return res.status(404).json({ message: "Etudiant non inscrit a cet evenement" });
        }

        if (participant.status === 'present') {
            return res.status(400).json({ message: "Etudiant deja marque comme present" });
        }

        participant.status = 'present';
        participant.presentAt = new Date();
        await event.save();

        res.status(200).json({ message: "Presence validee avec succes !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la validation de la presence" });
    }
};

const GetOrganizerStats = async (req, res) => {
    try {
        const { organizerId } = req.params;
        const events = await Event.find({ organizer: organizerId });

        const totalEvents = events.length;
        const totalInscriptions = events.reduce((acc, curr) => acc + curr.participants.length, 0);
        const totalPresent = events.reduce((acc, curr) => 
            acc + curr.participants.filter(p => p.status === 'present').length, 0
        );

        const stats = {
            totalEvents,
            totalInscriptions,
            totalPresent,
            attendanceRate: totalInscriptions > 0 ? (totalPresent / totalInscriptions * 100).toFixed(1) : 0,
            events: events.map(e => ({
                title: e.title,
                inscriptions: e.participants.length,
                presents: e.participants.filter(p => p.status === 'present').length
            }))
        };

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recuperation des statistiques" });
    }
};

const UpdateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: "Evenement non trouve" });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la modification de l'evenement" });
    }
};

const DeleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) return res.status(404).json({ message: "Evenement non trouve" });
        res.status(200).json({ message: "Evenement supprime avec succes" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'evenement" });
    }
};

// Recuperer les details d'un evenement avec les participants
const GetEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id)
            .populate('participants.student', 'firstName lastName email');
        
        if (!event) {
            return res.status(404).json({ message: "Evenement non trouve" });
        }
        
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recuperation de l'evenement" });
    }
};

module.exports = {
    CreateEvent,
    GetOrganizerEvents,
    MarkAttendance,
    GetOrganizerStats,
    UpdateEvent,
    DeleteEvent,
    GetEventById
};