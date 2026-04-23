const Student = require('../models/Student');
const bcrypt = require('bcrypt');
exports.registerUser = async (req, res) => {
    try {
        const { fullName, cne, email, tel, filiere, niveau, password }=req.body;
        const hashedPassword= await bcrypt.hash(password, 10);

        const newStudent = new Student({
            fullName,
            cne,
            email,
            tel,
            filiere,
            niveau,
            password: hashedPassword 
        });
        await newStudent.save()
        res.status(201).json({ message: "User Created! ✅" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};