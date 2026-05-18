const Student = require('../models/Student');
const bcrypt = require('bcrypt');

exports.registerStudent = async (req, res) => {
    console.log('=== registerStudent called ===');
    console.log('req.body:', req.body);
    try {
        const { fullName, cne, email, phone, filiere, niveau, anneeUniv, password } = req.body;

        // Validation: Academic Email format (prenom.nom.XX@edu.uiz.ac.ma)
        const academicEmailRegex = /^[a-z-]+\.[a-z-]+\.\d{2}@edu\.uiz\.ac\.ma$/i;
        if (!academicEmailRegex.test(email)) {
            return res.status(400).json({ 
                message: "Format d'email académique invalide. Format attendu: prenom.nom.2chiffres@edu.uiz.ac.ma" 
            });
        }

        // Validation: CNE (1 letter + 9 numbers)
        const cneRegex = /^[A-Z]\d{9}$/i;
        if (!cneRegex.test(cne)) {
            return res.status(400).json({ message: "Le CNE doit commencer par une lettre suivie de 9 chiffres." });
        }

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