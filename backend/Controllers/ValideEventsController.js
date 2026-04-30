const Event_db = require('../models/Event');

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

        res.status(200).json({ message: "Event validé avec succès", event });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

module.exports = { valideEvent };