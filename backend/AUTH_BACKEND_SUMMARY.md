# Résumé du Backend d'Authentification

## 📁 Structure des Fichiers

```
backend/
├── Controllers/
│   └── authController.js      # Logique métier d'authentification
├── Routes/
│   └── authRoutes.js           # Définition des routes API
├── models/
│   ├── Student.js              # Modèle Étudiant
│   ├── Organisateur.js         # Modèle Organisateur
│   ├── Administrateur.js       # Modèle Super Admin
│   └── Administration.js       # Modèle Personnel d'Administration
├── server.js                    # Serveur principal
├── test-auth.js                 # Script de test (créé)
└── package.json                 # Dépendances
```

## 🔐 Endpoints API

### POST /api/auth/login
Authentifie un utilisateur et retourne ses informations.

**Corps de la requête :**
```json
{
  "email": "user@example.com",
  "password": "motdepasse"
}
```

**Réponse en cas de succès (200) :**
```json
{
  "_id": "id_utilisateur",
  "displayName": "Nom Complet",
  "email": "user@example.com",
  "role": "student|organizer|admin|administration",
  "staffOf": null | {
    "organizerId": "id_organisateur",
    "nomClub": "Nom du Club"
  },
  "message": "Bienvenue"
}
```

**Erreurs possibles :**
- 404 : Email incorrect
- 400 : Mot de passe incorrect
- 403 : Compte en attente ou rejeté (pour organisateurs)
- 500 : Erreur serveur

### POST /api/auth/forgot-password
Envoie un email de réinitialisation de mot de passe.

**Corps de la requête :**
```json
{
  "email": "user@example.com"
}
```

## 👥 Types d'Utilisateurs

### 1. Student (Étudiant)
- Champs : fullName, cne, email, phone, filiere, niveau, password
- Rôle par défaut : 'student'

### 2. Organisateur
- Champs : prenom, nom, telephone, nomClub, email, password, justificatif, status
- Status : 'En attente' | 'Validé' | 'Rejeté'
- Rôle par défaut : 'organizer'
- Possède un tableau 'staff' d'étudiants associés

### 3. Administrateur (Super Admin)
- Champs : email, password, role
- Rôle par défaut : 'admin'
- Compte par défaut :
  - Email : superadmin@uiz.ac.ma
  - Mot de passe : SuperAdmin@1234

### 4. Administration (Personnel)
- Champs : prenom, nom, telephone, email, password, role
- Rôle personnalisable (IT, Administration, Developpeur, etc.)

## 🚀 Comment Tester

1. **Démarrer le serveur :**
   ```bash
   cd backend
   npm run dev
   ```

2. **Exécuter les tests :**
   ```bash
   node test-auth.js
   ```

3. **Tester avec curl ou Postman :**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"superadmin@uiz.ac.ma","password":"SuperAdmin@1234"}'
   ```

## 📦 Dépendances Principales

- **express** : Framework web
- **mongoose** : ODM pour MongoDB
- **bcrypt** : Hachage des mots de passe
- **jsonwebtoken** : Gestion des tokens JWT
- **nodemailer** : Envoi d'emails
- **cors** : Gestion du CORS
- **cookie-parser** : Gestion des cookies

## 🔍 Flux d'Authentification

1. L'API reçoit email + password
2. Vérifie dans l'ordre : Student → Organisateur → Administrateur → Administration
3. Valide le statut pour les organisateurs
4. Compare le mot de passe haché avec bcrypt
5. Retourne les informations utilisateur avec le rôle
6. Détecte si l'étudiant fait partie du staff d'un organisateur
