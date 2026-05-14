const Administrateur = require('../models/Administrateur');
const Administration = require('../models/Administration');
const bcrypt = require('bcrypt');

exports.createAdministrateur = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const existing = await Administrateur.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Cet administrateur existe déjà." });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Administrateur({
            email,
            password: hashedPassword
        });
        
        await newAdmin.save();
        res.status(201).json({ message: "Administrateur créé avec succès!" });
        
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.createAdministration = async (req, res) => {
    try {
        const { prenom, nom, telephone, email, password } = req.body;
        
        const existing = await Administration.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Ce compte administration existe déjà." });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Administration({
            prenom,
            nom,
            telephone,
            email,
            password: hashedPassword
        });
        
        await newAdmin.save();
        res.status(201).json({ message: "Compte administration créé avec succès!" });
        
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.getAllAdministrateurs = async (req, res) => {
    try {
        const admins = await Administrateur.find({}, { password: 0 });
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.getAdministrationById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Administration.findById(id, { password: 0 });
        if (!admin) {
            return res.status(404).json({ message: "Administration non trouvé" });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.getAllAdministrations = async (req, res) => {
    try {
        const admins = await Administration.find({}, { password: 0 });
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.updateAdministrateur = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;
        
        const updateData = {};
        if (email) updateData.email = email;
        if (password) updateData.password = await bcrypt.hash(password, 10);
        
        await Administrateur.findByIdAndUpdate(id, updateData);
        res.status(200).json({ message: "Administrateur mis à jour avec succès!" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.updateAdministration = async (req, res) => {
    try {
        const { id } = req.params;
        const { prenom, nom, telephone, email, password } = req.body;
        
        const updateData = {};
        if (prenom) updateData.prenom = prenom;
        if (nom) updateData.nom = nom;
        if (telephone) updateData.telephone = telephone;
        if (email) updateData.email = email;
        if (password) updateData.password = await bcrypt.hash(password, 10);
        
        await Administration.findByIdAndUpdate(id, updateData);
        res.status(200).json({ message: "Compte administration mis à jour avec succès!" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.deleteAdministrateur = async (req, res) => {
    try {
        const { id } = req.params;
        await Administrateur.findByIdAndDelete(id);
        res.status(200).json({ message: "Administrateur supprimé avec succès!" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.deleteAdministration = async (req, res) => {
    try {
        const { id } = req.params;
        await Administration.findByIdAndDelete(id);
        res.status(200).json({ message: "Compte administration supprimé avec succès!" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
