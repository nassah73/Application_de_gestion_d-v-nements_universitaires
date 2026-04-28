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
    
    //organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
   // createdAt: { type: Date, default: Date.now }
    organizer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Organisateur',
        required: true 
    },
    participants: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        status: { type: String, enum: ['registered', 'present'], default: 'registered' },
        registeredAt: { type: Date, default: Date.now },
        presentAt: { type: Date }
    }],
    feedbacks: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

module.exports = Event;