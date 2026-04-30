const mongoose = require('mongoose');

const AdministrationSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'administration' }
});

module.exports = mongoose.models.Administration || mongoose.model('Administration', AdministrationSchema);
