const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const addAdmin =require('./Routes/addAdmin')
const { MongoMemoryServer } = require('mongodb-memory-server');
const path = require('path');
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'))
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

            // Seed default categories
            const Category = require('./models/Category');
            const defaultCategories = [
                { name: 'Informatique', color: '#6366F1' },
                { name: 'Académique', color: '#10B981' },
                { name: 'Culturel', color: '#8B5CF6' },
                { name: 'Sportif', color: '#ef4444' },
                { name: 'Scientifique', color: '#cd7329' }
            ];

            for (const cat of defaultCategories) {
                const exists = await Category.findOne({ name: cat.name });
                if (!exists) {
                    await new Category(cat).save();
                    console.log(`✅ Catégorie "${cat.name}" créée`);
                }
            }
        } catch (populateErr) {
            console.error('Erreur lors de la population de la DB:', populateErr);
        }
    }
    const analyticsRoutes = require('./Routes/analytics');


    const studentRoutes = require('./Routes/studentRoutes');
    const organisateurRoutes = require('./Routes/organisateurRoutes');
    const administrationRoutes = require('./Routes/AdministrationRoutes');
    const administrateurRoutes = require('./Routes/AdministrateurRoutes');
    const authRoutes = require('./Routes/authRoutes');  
    const CreateEvent=require('./Routes/CreateEvent')
    const ValideEvent=require('./Routes/ValideEvents')
    const categoryRoutes = require('./Routes/CategoryRoutes');
    const newsRoutes = require('./Routes/NewsRoutes');
    const notificationRoutes = require('./Routes/NotificationRoutes');
    const deleteMyEventRoutes = require('./Routes/DeleteMyEvent');

    app.use('/api/students', studentRoutes);
    app.use('/api/organisateurs', organisateurRoutes);
    app.use('/organisateur', organisateurRoutes); // Ajout du préfixe demandé par l'utilisateur
    app.use('/api/administration', administrationRoutes); 
    app.use('/api/administrateur', administrateurRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/Event', CreateEvent);
    app.use('/Event', deleteMyEventRoutes); // Mount delete registration route under /Event
    app.use('/api/valide',ValideEvent)
    app.use('/api/categories', categoryRoutes);
    app.use('/api/notifications', notificationRoutes);
    app.use('/api/news', newsRoutes);
    app.use('/api/analytics', analyticsRoutes);
    
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