const Student = require('../models/Student');
const Organisateur = require('../models/Organisateur');
const Administrateur = require('../models/Administrateur');
const Administration = require('../models/Administration');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = null;
        let role = null;
        let staffOf = null;

        // 1. التشييك على Student
        user = await Student.findOne({ email });
        if (user) {
            role = 'student';
            const organizerWithStaff = await Organisateur.findOne({ 'staff.student': user._id });
            if (organizerWithStaff) {
                staffOf = {
                    organizerId: organizerWithStaff._id,
                    nomClub: organizerWithStaff.nomClub
                };
            }
        }

        // 2. التشييك على Organisateur
        if (!user) {
            user = await Organisateur.findOne({ email });
            role = 'organizer';
            if (user) {
                if (user.status === 'En attente') {
                    return res.status(403).json({ 
                        message: "Votre compte est en attente de validation par l'administration."
                    });
                }
                if (user.status === 'Rejeté') {
                    return res.status(403).json({ 
                        message: "Votre compte a été rejeté par l'administration."
                    });
                }
            }
        }

        // 3. التشييك على Administrateur (Super Admin)
        if (!user) {
            user = await Administrateur.findOne({ email });
            if (user) role = 'admin';
        }

        // 4. التشييك على Administration (الـ Model الجديد ديالك)
        if (!user) {
            user = await Administration.findOne({ email });
            if (user) {
                // هنا كنخدو الـ role مباشرة من الـ DB (IT, Administration, Developpeur...)
                role = user.role; 
            }
        }

        // إذا مالقينا حتى واحد
        if (!user) {
            return res.status(404).json({ message: "Email incorrect" });
        }

        // التحقق من الباسورد
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }
        
        // إعداد البيانات اللي غاترجع (Handling fullname vs nom/prenom)
        res.status(200).json({
            _id: user._id,
            // إلا كان من Administration كنخدو fullname، وإلا كان طالب كنخدو prenom + nom
            displayName: user.fullname || `${user.prenom} ${user.nom}`,
            email: user.email,
            role: role, 
            staffOf: staffOf,
            message: "Bienvenue"
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // 1. إعداد الـ Transporter (حساب Gmail مثلاً)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'votre-email@gmail.com', // إيميل المؤسسة أو إيميلك
                pass: 'your-app-password'      // كود التطبيق من جوجل
            }
        });

        // 2. محتوى الإيميل
        const mailOptions = {
            from: '"FP Taroudant" <votre-email@gmail.com>',
            to: email,
            subject: 'Réinitialisation de mot de passe',
            html: `
                <h1>Réinitialisation de mot de passe</h1>
                <p>لقد طلبت إعادة تعيين كلمة المرور الخاصة بك.</p>
                <p>إضغط على الرابط أسفله للمتابعة:</p>
                <a href="http://localhost:3000/reset-password">Modifier mon mot de passe</a>
            `
        };

       
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ message: "Email envoyé !" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
    }
};