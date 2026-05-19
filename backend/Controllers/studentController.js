const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('profileImage');

exports.registerStudent = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(500).json({ message: "Erreur lors de l'upload de l'image" });
        }

        console.log('=== registerStudent called ===');
        console.log('req.body:', req.body);
        console.log('req.file:', req.file);

        try {
            const { fullName, cne, email, phone, filiere, niveau, password } = req.body;

            // Validation: Email extension
            if (!email.endsWith('@edu.uiz.ac.ma')) {
                return res.status(400).json({ message: "Veuillez utiliser votre email académique (@edu.uiz.ac.ma)" });
            }

            // Validation: CNE (1 letter + 9 numbers)
            const cneRegex = /^[A-Z]\d{9}$/i;
            if (!cneRegex.test(cne)) {
                return res.status(400).json({ message: "Le CNE doit commencer par une lettre suivie de 9 chiffres." });
            }

            // Check if student already exists
            const existingStudent = await Student.findOne({ $or: [{ email }, { cne }] });
            if (existingStudent) {
                return res.status(400).json({ message: "Un étudiant avec cet email ou CNE existe déjà." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newStudent = new Student({
                fullName,
                cne,
                email,
                phone,
                filiere,
                niveau,
                password: hashedPassword,
                profileImage: req.file ? req.file.path : null
            });

            await newStudent.save();
            console.log('Student saved successfully:', newStudent);
            res.status(201).json({ message: "Student account created successfully! ✅" });
        } catch (err) {
            console.error('Error registering student:', err);
            res.status(400).json({ error: err.message, message: "Error registering student." });
        }
    });
};