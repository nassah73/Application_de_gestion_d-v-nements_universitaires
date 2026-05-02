const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Administrateur = require('./models/Administrateur');

mongoose.connect('mongodb://127.0.0.1:27017/pfe_fpt')
    .then(async () => {
        console.log('Connected to MongoDB');

        // Check and create Administrateur account
        const existingSuperAdmin = await Administrateur.findOne({ email: 'superadmin@uiz.ac.ma' });
        if (!existingSuperAdmin) {
            const hashedPassword = await bcrypt.hash('SuperAdmin@1234', 10);
            const superAdmin = new Administrateur({
                email: 'superadmin@uiz.ac.ma',
                password: hashedPassword,
                role: 'admin'
            });
            await superAdmin.save();
            console.log('✅ Compte Administrateur créé avec succès !');
            console.log('   Email: superadmin@uiz.ac.ma');
            console.log('   Password: SuperAdmin@1234');
        } else {
            console.log('Compte Administrateur déjà existant.');
        }

        process.exit(0);
    })
    .catch(err => {
        console.error('Erreur:', err);
        process.exit(1);
    });
