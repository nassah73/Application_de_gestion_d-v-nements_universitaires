const Student = require('../models/Student');
const organiser =require('../models/Organisateur')
const admin= require('../models/Adminstrateur')
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
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = null;
        let role = '';

        
        user = await Student.findOne({ email });
        if (user) {
            role = 'student';
        } else {
            user = await organiser.findOne({ email });
            if (user) {
                role = 'organizer';
            } else {
                user = await admin.findOne({ email });
                if (user) {
                    role = 'admin';
                }
            }
        }

       
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé !" });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect !" });
        }

        
        res.status(200).json({
            message: "Success",
            role: role,
            userId: user._id,
            fullName: user.fullName || user.orgName 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};