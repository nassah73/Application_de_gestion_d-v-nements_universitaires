const Events_db =require('../models/Event')
const Organisateur = require('../models/Organisateur');

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
const Registration = require('../models/My_Events'); 

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
            role: type || 'participant' 
        });
        
        await newRegistration.save();

        // LOGIQUE SUPPLÉMENTAIRE POUR LE VOLONTARIAT
        if (type === 'volunteer') {
            const event = await Events_db.findById(eventId);
            if (event && event.organizer) {
                const organizer = await Organisateur.findById(event.organizer);
                if (organizer) {
                    // Vérifier si une demande existe déjà pour éviter les doublons dans staffRequests
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
            res.status(200).json(registrations);
        }

        res.status(200).json(registrations);
    } catch (error) {
        console.error("Error fetching registrations:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}
module.exports={Student_Events,setMyEvent,My_registers};