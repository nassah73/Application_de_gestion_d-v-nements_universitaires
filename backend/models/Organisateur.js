const mongoose = require('mongoose');

const OrganisateurSchema = mongoose.Schema({
   
    orgName: { type: String, required: true },
    
   
    orgType: { type: String, required: true },

   
    responsibleName: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    
    document: { type: String, required: true },

    
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
    }
});

module.exports = mongoose.model('Organisateur', OrganisateurSchema);