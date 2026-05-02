const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const addAdmin =require('./Routes/addAdmin')
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const startServer = async () => {
    let mongoUri = 'mongodb://127.0.0.1:27017/pfe_fpt';
    
    try {
        // Try to connect to local MongoDB first
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
        console.log('Connexion à MongoDB locale réussie');
    } catch (err) {
        console.warn('Erreur de connexion à MongoDB locale, démarrage de MongoMemoryServer...');
        const mongoServer = await MongoMemoryServer.create();
        mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
        console.log('Connexion à MongoMemoryServer réussie:', mongoUri);
        
        // Populate with default admin if using memory server
        try {
            const bcrypt = require('bcrypt');
            const Administration = require('./models/Administration');
            const existing = await Administration.findOne({ email: 'admin@uiz.ac.ma' });
            if (!existing) {
                const hashedPassword = await bcrypt.hash('Admin@1234', 10);
                const admin = new Administration({
                    email: 'admin@uiz.ac.ma',
                    password: hashedPassword,
                    role: 'administration'
                });
                await admin.save();
                console.log('✅ Compte Administration par défaut créé (Memory DB)');
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
    const ValideEvent=require('./Routes/ValideEvents')
    app.use('/api/students', studentRoutes);
    app.use('/api/organisateurs', organisateurRoutes);
    app.use('/api/administration', administrationRoutes); 
    app.use('/api/administrateur', administrateurRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/Event', CreateEvent);
    app.use('/api/valide',ValideEvent)
    
    app.use( '/api/administrateur',addAdmin)
    const csrfProtection = csrf({ cookie: true });
    app.get('/api/csrf-token', csrfProtection, (req, res) => {
        res.json({ csrfToken: req.csrfToken() });
    });

    app.listen(5000, () => {
        console.log('Serveur démarré sur le port 5000');
    });
};
http://localhost:5000/api/administrateur/ajoutAdmin
//http://localhost:5000/Events/GetEvets
startServer();