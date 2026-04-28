const mongoose = require('mongoose');

const organisateurSchema = new mongoose.Schema({
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    telephone: { type: String, required: true },
    nomClub: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    justificatif: { type: String }, 
    status: { type: String, default: 'En attente' }, 
    role: { type: String, default: 'organizer' },
    staff: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        addedAt: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Organisateur', organisateurSchema);