const Administration = require('../Models/Administration'); 
const bcrypt = require('bcrypt');

const addAdmin = async (req, res) => {
    try {
        // 1. شد البيانات من req.body (رد البال للسميات اللي جايين من Frontend)
        const { name, email, password, role } = req.body;

        // 2. تأكد بلي كاع البيانات كاينين
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires." });
        }

        // 3. تأكد واش هاد الـ email ديجا كاين (حيت داير unique: true ف الـ Schema)
        const existingAdmin = await Administration.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        // 4. تشفير الـ Password (حماية)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. إنشاء الـ Admin الجديد (هنا استعملت fullname كيف كاين ف الـ Schema ديالك)
        const newAdmin = new Administration({
            fullname: name, // حولنا name لـ fullname باش تمشي مع الـ Model
            email: email,
            password: hashedPassword,
            role: role || 'administration' // إلا ما صيفطناش الـ role، ياخد الـ default
        });

        // 6. الحفظ ف الـ Database
        await newAdmin.save();

        // 7. رد الجواب للـ Frontend
        res.status(201).json({ 
            message: "Administrateur ajouté avec succès !",
            admin: {
                id: newAdmin._id,
                fullname: newAdmin.fullname,
                email: newAdmin.email,
                role: newAdmin.role
            }
        });

    } catch (error) {
        console.error("Erreur Backend:", error);
        res.status(500).json({ message: "Erreur serveur lors de l'ajout de l'administrateur." });
    }
};

module.exports = { addAdmin };