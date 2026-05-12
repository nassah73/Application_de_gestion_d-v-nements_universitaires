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
    status: { type: String, default: 'pending' },
    role: { type: String, enum: ['participant', 'volunteer'], default: 'participant' },
    attendanceStatus: { type: String, enum: ['absent', 'present'], default: 'absent' },
    presentAt: { type: Date }
});

module.exports = mongoose.model('Registration', RegistrationSchema);