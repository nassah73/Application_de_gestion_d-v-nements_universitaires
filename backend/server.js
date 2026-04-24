const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const studentRoutes = require('./Routes/studentRoutes');
const organisateurRoutes = require('./Routes/organisateurRoutes');
const administrationRoutes = require('./Routes/AdministrationRoutes');
const administrateurRoutes = require('./Routes/AdministrateurRoutes');
const authRoutes = require('./Routes/authRoutes');  

app.use('/api/students', studentRoutes);
app.use('/api/organisateurs', organisateurRoutes);
app.use('/api/administration', administrationRoutes); 
app.use('/api/administrateur', administrateurRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/pfe_fpt')
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

app.listen(5000, () => {
    console.log('Serveur démarré sur le port 5000');
});