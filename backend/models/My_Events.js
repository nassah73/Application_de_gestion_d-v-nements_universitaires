const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', 
        required: true 
    },
    event: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event', 
        required: true 
    },
    registrationDate: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Registration', RegistrationSchema);