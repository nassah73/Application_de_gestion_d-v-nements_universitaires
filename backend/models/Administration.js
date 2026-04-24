const mongoose = require('mongoose');

const AdministrationSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'administration' }
});

module.exports = mongoose.model('Administration', AdministrationSchema);
