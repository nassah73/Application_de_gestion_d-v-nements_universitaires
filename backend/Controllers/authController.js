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
            profileImage: user.profileImage || null,
            message: "Bienvenue"
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
exports.forgotPassword = async (req, res) => {
    try {
        // 1. Extraire et normaliser l'email (en minuscules)
        const { email } = req.body;
        const normalizedEmail = email.toLowerCase();

        // 2. Recherche multi-collections (fallback)
        let user = null;

        // Vérifier d'abord la collection Administrateur
        user = await Administrateur.findOne({ email: normalizedEmail });
        if (!user) {
            // Si pas trouvé, vérifier la collection Student
            user = await Student.findOne({ email: normalizedEmail });
        }
        if (!user) {
            // Si pas trouvé, vérifier la collection Organisateur
            user = await Organisateur.findOne({ email: normalizedEmail });
        }
        if (!user) {
            // Si pas trouvé, vérifier la collection Administration
            user = await Administration.findOne({ email: normalizedEmail });
        }

        // 3. Si aucun utilisateur trouvé dans aucune collection
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // 4. Générer un code OTP à 6 chiffres aléatoire
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // 5. Définir la date d'expiration (15 minutes à partir de maintenant)
        const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 * 60 secondes = 900 000 ms

        // 6. Enregistrer le code et sa date d'expiration dans le document de l'utilisateur (sans validation complète)
        user.resetOTP = otp;
        user.resetOTPExpires = otpExpires;
        await user.save({ validateBeforeSave: false });

        // 7. Configurer le transporteur Nodemailer avec les identifiants Ethereal
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'daniella.walker29@ethereal.email',
                pass: 'fPbgPTJqnePRT1zYAM'
            }
        });

        // 8. Préparer le contenu de l'email
        const mailOptions = {
            from: '"University Event Management" <no-reply@university-event.com>',
            to: email, // Champ "to" dynamique
            subject: 'Réinitialisation de mot de passe - Code de vérification',
            html: `
                <!DOCTYPE html>
                <html lang="fr">
                <head>
                    <meta charset="UTF-8">
                    <title>Réinitialisation de mot de passe</title>
                    <style>
                        body { 
                            font-family: 'Arial', sans-serif; 
                            background-color: #f4f4f4; 
                            padding: 20px; 
                            margin: 0;
                        }
                        .container { 
                            max-width: 600px; 
                            margin: 0 auto; 
                            background: white; 
                            padding: 30px; 
                            border-radius: 8px; 
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
                        }
                        h1 { 
                            color: #2d3748; 
                            font-size: 24px; 
                            margin-bottom: 20px; 
                        }
                        .otp-box { 
                            background: #e6f2ff; 
                            padding: 25px; 
                            text-align: center; 
                            border-radius: 8px; 
                            margin: 25px 0; 
                        }
                        .otp { 
                            font-size: 36px; 
                            font-weight: bold; 
                            color: #2b6cb0; 
                            letter-spacing: 10px; 
                        }
                        p { 
                            color: #4a5568; 
                            line-height: 1.7; 
                        }
                        .footer { 
                            margin-top: 35px; 
                            padding-top: 20px; 
                            border-top: 1px solid #e2e8f0; 
                            color: #718096; 
                            font-size: 12px; 
                            text-align: center; 
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Réinitialisation de votre mot de passe</h1>
                        <p>Bonjour,</p>
                        <p>Vous avez demandé la réinitialisation de votre mot de passe. Voici votre code de vérification:</p>
                        <div class="otp-box">
                            <div class="otp">${otp}</div>
                        </div>
                        <p>Ce code expirera dans <strong>15 minutes</strong>. Ne le partagez avec personne.</p>
                        <p>Si vous n'avez pas demandé de réinitialisation, ignorez simplement cet email.</p>
                        <div class="footer">
                            <p>© 2025 University Event Management - Tous droits réservés</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        // 9. Essayer d'envoyer l'email via Ethereal
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log(`✅ OTP envoyé avec succès à ${email}`);
            console.log(`📧 Voir l'email: ${nodemailer.getTestMessageUrl(info)}`);
        } catch (emailError) {
            console.log(`⚠️ Erreur lors de l'envoi de l'email, mais OTP généré: ${emailError.message}`);
            console.log(`🔑 Pour les tests, votre OTP est: ${otp}`);
        }

        // 10. Retourner la réponse de succès au frontend (même si l'email a échoué)
        res.status(200).json({ 
            message: "Code de réinitialisation envoyé à votre email !",
            testOtp: process.env.NODE_ENV === 'development' ? otp : undefined
        });

    } catch (error) {
        console.error('❌ Erreur forgotPassword:', error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const normalizedEmail = email.toLowerCase();

        let user = null;

        // Vérifier d'abord la collection Administrateur
        user = await Administrateur.findOne({ email: normalizedEmail });
        if (!user) {
            // Si pas trouvé, vérifier la collection Student
            user = await Student.findOne({ email: normalizedEmail });
        }
        if (!user) {
            // Si pas trouvé, vérifier la collection Organisateur
            user = await Organisateur.findOne({ email: normalizedEmail });
        }
        if (!user) {
            // Si pas trouvé, vérifier la collection Administration
            user = await Administration.findOne({ email: normalizedEmail });
        }

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
        await user.save({ validateBeforeSave: false });

        res.status(200).json({ message: "Mot de passe modifié avec succès" });

    } catch (error) {
        console.error('Erreur resetPassword:', error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};