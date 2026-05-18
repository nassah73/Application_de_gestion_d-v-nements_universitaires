const Events_db =require('../models/Event')
const Organisateur = require('../models/Organisateur');
const Registration = require('../models/My_Events'); 
const Notification = require('../models/Notification');

const Student_Events= async(req,res)=>{
    try{
        const events = await Events_db.find({ status: 'approved' }).populate('organizer', 'prenom nom ');
        if (events.length === 0) {
            return res.status(200).json({ message: "No approved events yet" });
        }
            res.status(200).json(events)
    }catch(error){
        console.log("SERVER ERROR:", error);
     
     res.status(500).json({ 
            message: "Erreur lors de la récupération des données", 
            error: error.message 
        });
    }

}

const setMyEvent = async (req, res) => {
    try {
        
        const { studentId, eventId, type } = req.body; 

        const existingRegistration = await Registration.findOne({ 
            student: studentId, 
            event: eventId 
        });

        if (existingRegistration) {
            return res.status(400).json({ message: "Vous êtes déjà inscrit à cet événement" });
        }

        const newRegistration = new Registration({ 
            student: studentId, 
            event: eventId,
            role: type || 'participant',
            status: type === 'volunteer' ? 'pending' : 'approved' // Volontaires en attente, participants approuvés
        });
        
        await newRegistration.save();

        const event = await Events_db.findById(eventId);
        if (event && event.organizer) {
            // Notification pour l'organisateur
            const notification = new Notification({
                recipient: event.organizer,
                title: type === 'volunteer' ? "Nouvelle demande de staff" : "Nouvelle inscription",
                message: type === 'volunteer' 
                    ? `Un étudiant souhaite rejoindre votre équipe pour l'événement "${event.title}"`
                    : `Un nouvel étudiant s'est inscrit à votre événement "${event.title}"`,
                type: 'registration',
                relatedEvent: eventId
            });
            await notification.save();

            if (type === 'volunteer') {
                const organizer = await Organisateur.findById(event.organizer);
                if (organizer) {
                    const alreadyRequested = organizer.staffRequests.find(
                        r => r.student.toString() === studentId && r.status === 'en attente'
                    );
                    
                    if (!alreadyRequested) {
                        organizer.staffRequests.push({ 
                            student: studentId, 
                            status: 'en attente' 
                        });
                        await organizer.save();
                    }
                }
            }
        }

        return res.status(201).json({ 
            message: type === 'volunteer' ? "Demande de volontariat envoyée à l'organisateur" : "Inscription réussie", 
            registration: newRegistration 
        });

    } catch (error) {
        console.error("Error saving registration:", error);
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

const My_registers = async (req, res) => {
    try {
        const { studentId } = req.params; 

        const registrations = await Registration.find({ student: studentId })
            .populate({
                path: 'event', 
                populate: {
                    path: 'organizer', 
                    select: 'prenom nom email' 
                }
            });

        if (registrations.length === 0) {
            return res.status(200).json([]);
        }

        // Retourner uniquement les inscriptions approuvées
        const filteredRegistrations = registrations.filter(reg => reg.status === 'approved' && reg.event !== null);

        res.status(200).json(filteredRegistrations);
    } catch (error) {
        console.error("Error fetching registrations:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}

const VerifyScan = async (req, res) => {
    try {
        const { studentId, eventId } = req.body;

        const registration = await Registration.findOne({ 
            student: studentId, 
            event: eventId,
            status: 'approved'
        }).populate('student', 'fullName profileImage');

        if (!registration) {
            return res.status(404).json({ 
                success: false, 
                message: "Étudiant non inscrit ou demande non approuvée." 
            });
        }

        if (registration.attendanceStatus !== 'present') {
            registration.attendanceStatus = 'present';
            registration.presentAt = new Date();
            await registration.save();
        }

        return res.status(200).json({ 
            success: true, 
            message: "Présence validée avec succès.",
            student: registration.student.fullName,
            profileImage: registration.student.profileImage
        });

    } catch (error) {
        console.error("Error verifying scan:", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
};

module.exports={Student_Events,setMyEvent,My_registers,VerifyScan};
