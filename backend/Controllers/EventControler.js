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
const Registration = require('../models/My_Events');

const CreateEvent = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de l'upload de l'image" });
        }

        try {
            
            const { title, category, capacity, date, location, registrationLink, description, organizer, needsHelp } = req.body;

            const newEvent = new Event({
                title,
                category,
                capacity: Number(capacity),
                date,
                location,
                registrationLink,
                description,
                organizer,
                needsHelp, 
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
        
        const registration = await Registration.findOne({ event: eventId, student: studentId });
        if (!registration) {
            return res.status(404).json({ message: "Etudiant non inscrit a cet evenement" });
        }

        if (registration.attendanceStatus === 'present') {
            return res.status(400).json({ message: "Etudiant deja marque comme present" });
        }

        registration.attendanceStatus = 'present';
        registration.presentAt = new Date();
        await registration.save();

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
        const pendingEvents = events.filter(e => e.status === 'pending').length;
        const approvedEvents = events.filter(e => e.status === 'approved' || e.status === 'approved-modified').length;
        
        // Get all registrations for these events
        const eventIds = events.map(e => e._id);
        const registrations = await Registration.find({ event: { $in: eventIds } });

        const totalInscriptions = registrations.length;
        const totalPresent = registrations.filter(r => r.attendanceStatus === 'present').length;
        const totalVolunteers = registrations.filter(r => r.role === 'volunteer').length;

        const stats = {
            totalEvents,
            pendingEvents,
            approvedEvents,
            totalInscriptions,
            totalPresent,
            totalVolunteers,
            attendanceRate: totalInscriptions > 0 ? (totalPresent / totalInscriptions * 100).toFixed(1) : 0,
            events: events.map(e => ({
                id: e._id,
                title: e.title,
                status: e.status,
                inscriptions: registrations.filter(r => r.event.toString() === e._id.toString()).length,
                presents: registrations.filter(r => r.event.toString() === e._id.toString() && r.attendanceStatus === 'present').length
            }))
        };

        res.status(200).json(stats);
    } catch (error) {
        console.error("Stats Error:", error);
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
        const event = await Event.findById(id).lean();
        
        if (!event) {
            return res.status(404).json({ message: "Evenement non trouve" });
        }

        // Fetch participants from Registration model
        const participants = await Registration.find({ event: id })
            .populate('student', 'fullName email'); 
        
        event.participants = participants;
        
        res.status(200).json(event);
    } catch (error) {
        console.error("Error in GetEventById:", error);
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