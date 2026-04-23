const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  cne: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  filiere: String,
  niveau: String,
  anneeUniv: String,
  role: { type: String, default: 'student' } ,
  password: { type: String, required: true },
});

module.exports = mongoose.model('Student', studentSchema);