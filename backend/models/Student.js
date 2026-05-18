const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  cne: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^[A-Z]\d{9}$/i, 'Format CNE invalide (Ex: D123456789)']
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/@edu\.uiz\.ac\.ma$/, 'Veuillez utiliser votre email académique (@edu.uiz.ac.ma)']
  },
  phone: { type: String, required: true },
  filiere: { type: String, required: true },
  niveau:  { type: String, required: true },
  
  role: { type: String, default: 'student' } ,
  password: { type: String, required: true },
  resetOTP: { type: String },
  resetOTPExpires: { type: Date }
});

module.exports = mongoose.model('Student', StudentSchema);