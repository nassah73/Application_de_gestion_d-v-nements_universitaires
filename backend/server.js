const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });
// app.use(csrfProtection); // Disabled for now to not break existing frontend without token management

app.get('/api/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

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

mongoose.connect('mongodb://127.0.0.1:27017/pfe_fpt')
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

app.listen(5000, () => {
    console.log('Serveur démarré sur le port 5000');
});