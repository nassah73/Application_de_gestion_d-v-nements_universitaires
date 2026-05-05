const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  cne: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  filiere: { type: String, required: true },
  niveau:  { type: String, required: true },
  
  role: { type: String, default: 'student' } ,
  password: { type: String, required: true },
  resetOTP: { type: String },
  resetOTPExpires: { type: Date }
});

module.exports = mongoose.model('Student', StudentSchema);