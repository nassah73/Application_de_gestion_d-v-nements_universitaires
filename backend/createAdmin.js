const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Administration = require('./models/Administration');

mongoose.connect('mongodb://127.0.0.1:27017/pfe_fpt')
    .then(async () => {
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existing = await Administration.findOne({ email: 'admin@uiz.ac.ma' });
        if (existing) {
            console.log('Admin account already exists!');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('Admin@1234', 10);
        const admin = new Administration({
            email: 'admin@uiz.ac.ma',
            password: hashedPassword,
            role: 'administration'
        });
        await admin.save();
        console.log('✅ Compte Administration créé avec succès !');
        console.log('   Email: admin@uiz.ac.ma');
        console.log('   Password: Admin@1234');
        process.exit(0);
    })
    .catch(err => {
        console.error('Erreur:', err);
        process.exit(1);
    });
