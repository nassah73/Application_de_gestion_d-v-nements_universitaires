const Student = require('../models/Student');
const bcrypt = require('bcrypt');

exports.registerStudent = async (req, res) => {
    console.log('=== registerStudent called ===');
    console.log('req.body:', req.body);
    try {
        const { fullName, cne, email, phone, filiere, niveau, anneeUniv, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({
            fullName,
            cne,
            email,
            phone,
            filiere,
            niveau,
            password: hashedPassword 
        });
        await newStudent.save();
        console.log('Student saved successfully:', newStudent);
        res.status(201).json({ message: "Student account created successfully! ✅" });
    } catch (err) {
        console.error('Error registering student:', err);
        res.status(400).json({ error: err.message, message: "Error registering student." });
    }
};