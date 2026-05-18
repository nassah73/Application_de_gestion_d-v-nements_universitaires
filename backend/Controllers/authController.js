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
        let displayName;
        if (user.fullname) {
            displayName = user.fullname;
        } else if (user.prenom && user.nom) {
            displayName = `${user.prenom} ${user.nom}`;
        } else if (user.fullName) {
            displayName = user.fullName;
        } else {
            displayName = user.email.split('@')[0];
        }
        
        res.status(200).json({
            _id: user._id,
            displayName: displayName,
            prenom: user.prenom || null,
            nom: user.nom || null,
            email: user.email,
            role: role, 
            staffOf: staffOf,
            
            cne: user.cne || null,
            phone: user.phone || null,
            filiere: user.filiere || null,
            niveau: user.niveau || null,
            message: "Bienvenue"
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        let user = null;
        let userType = null;

        user = await Student.findOne({ email });
        if (user) userType = 'Student';

        if (!user) {
            user = await Organisateur.findOne({ email });
            if (user) userType = 'Organisateur';
        }

        if (!user) {
            user = await Administrateur.findOne({ email });
            if (user) userType = 'Administrateur';
        }

        if (!user) {
            user = await Administration.findOne({ email });
            if (user) userType = 'Administration';
        }

        if (!user) {
            return res.status(404).json({ message: "Cet email n'existe pas dans notre système" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

        user.resetOTP = otp;
        user.resetOTPExpires = otpExpires;
        await user.save();

        console.log(`OTP généré pour ${email} (${userType}): ${otp}`);

        res.status(200).json({ 
            message: "Code de réinitialisation généré avec succès !",
            otp: otp,
            note: "Pour la démo, l'OTP est retourné directement. En production, il serait envoyé par email."
        });

    } catch (error) {
        console.error('Erreur forgotPassword:', error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        let user = null;

        user = await Student.findOne({ email });
        if (!user) user = await Organisateur.findOne({ email });
        if (!user) user = await Administrateur.findOne({ email });
        if (!user) user = await Administration.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        if (user.resetOTP !== otp) {
            return res.status(400).json({ message: "Code de vérification incorrect" });
        }

        if (user.resetOTPExpires && new Date() > user.resetOTPExpires) {
            return res.status(400).json({ message: "Le code a expiré" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOTP = undefined;
        user.resetOTPExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Mot de passe modifié avec succès" });

    } catch (error) {
        console.error('Erreur resetPassword:', error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};