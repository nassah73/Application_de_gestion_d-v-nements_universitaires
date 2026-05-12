const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    capacity: { type: Number, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    coverImage: { type: String }, 
    registrationLink: { type: String },
    
   
    needsHelp: { 
        type: String, 
        enum: ['yes', 'no'], 
        default: 'no' 
    },
  
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
    },
    
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisateur' }, 
    createdAt: { type: Date, default: Date.now },
    
    // Administration fields
    modifiedTitle: { type: String },
    modifiedDescription: { type: String },
    modifiedCategory: { type: String },
    modifiedCapacity: { type: Number },
    modifiedDate: { type: Date },
    modifiedLocation: { type: String },
    modifiedRegistrationLink: { type: String },
    rejectionReason: { type: String }
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

module.exports = Event;