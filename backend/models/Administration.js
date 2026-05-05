const mongoose = require('mongoose');

const AdministrationSchema = new mongoose.Schema({
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'administration' },
    resetOTP: { type: String },
    resetOTPExpires: { type: Date }
});

module.exports = mongoose.models.Administration || mongoose.model('Administration', AdministrationSchema);
