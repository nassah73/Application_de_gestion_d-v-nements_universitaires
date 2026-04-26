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
    
    
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
    },
    
  //  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
   // createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);