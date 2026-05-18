const mongoose = require('mongoose');

const AdministrateurSchema = new mongoose.Schema({
    prenom: { type: String, default: 'Super' },
    nom: { type: String, default: 'Admin' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
    resetOTP: { type: String },
    resetOTPExpires: { type: Date }
});

module.exports = mongoose.model('Administrateur', AdministrateurSchema);
