const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const startServer = async () => {
    let mongoUri = 'mongodb://127.0.0.1:27017/pfe_fpt';
    
    try {
        
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
        console.log('Connexion à MongoDB locale réussie');
    } catch (err) {
        console.warn('Erreur de connexion à MongoDB locale, démarrage de MongoMemoryServer...');
        const mongoServer = await MongoMemoryServer.create();
        mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
        console.log('Connexion à MongoMemoryServer réussie:', mongoUri);
        
        // Populate with default super admin if using memory server
        try {
            const bcrypt = require('bcrypt');
            const Administrateur = require('./models/Administrateur');
            
            const existingSuperAdmin = await Administrateur.findOne({ email: 'superadmin@uiz.ac.ma' });
            if (!existingSuperAdmin) {
                const hashedPassword = await bcrypt.hash('SuperAdmin@1234', 10);
                const superAdmin = new Administrateur({
                    email: 'superadmin@uiz.ac.ma',
                    password: hashedPassword,
                    role: 'admin'
                });
                await superAdmin.save();
                console.log('✅ Compte Administrateur par défaut créé (Memory DB)');
            }
        } catch (populateErr) {
            console.error('Erreur lors de la population de la DB:', populateErr);
        }
    }

    const studentRoutes = require('./Routes/studentRoutes');
    const organisateurRoutes = require('./Routes/organisateurRoutes');
    const administrationRoutes = require('./Routes/AdministrationRoutes');
    const administrateurRoutes = require('./Routes/AdministrateurRoutes');
    const authRoutes = require('./Routes/authRoutes');  
    const CreateEvent=require('./Routes/CreateEvent')
    
    app.use('/api/students', studentRoutes);
    app.use('/api/organisateurs', organisateurRoutes);
    app.use('/api/administration', administrationRoutes); 
    app.use('/api/administrateur', administrateurRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/Event', CreateEvent);

    const csrfProtection = csrf({ cookie: true });
    app.get('/api/csrf-token', csrfProtection, (req, res) => {
        res.json({ csrfToken: req.csrfToken() });
    });

    app.listen(5000, () => {
        console.log('Serveur démarré sur le port 5000');
    });
};

startServer();