# Authentification des Étudiants

## ✅ Tests Réussis

Toutes les fonctionnalités d'authentification des étudiants ont été testées et fonctionnent correctement :

### 1. Inscription d'un étudiant
- **Endpoint** : `POST /api/students/register`
- **Statut** : ✅ Succès (201)
- **Message** : "Student account created successfully! ✅"

### 2. Connexion étudiant (succès)
- **Endpoint** : `POST /api/auth/login`
- **Statut** : ✅ Succès (200)
- **Réponse** :
  ```json
  {
    "_id": "69fa0dfc2df7c2840de860a7",
    "displayName": "Ahmed Benali",
    "email": "ahmed.benali@uiz.ac.ma",
    "role": "student",
    "staffOf": null,
    "message": "Bienvenue"
  }
  ```

### 3. Connexion étudiant (mot de passe incorrect)
- **Endpoint** : `POST /api/auth/login`
- **Statut** : ✅ Erreur (400)
- **Message** : "Mot de passe incorrect"

---

## 📁 Fichiers Concernés

### Modèle de Données (`models/Student.js`)
```javascript
{
  fullName: String,    // Nom complet
  cne: String,          // Code National Étudiant (unique)
  email: String,        // Email (unique)
  phone: String,        // Numéro de téléphone
  filiere: String,      // Filière
  niveau: String,       // Niveau d'étude
  role: String,         // Par défaut: 'student'
  password: String      // Mot de passe haché
}
```

### Contrôleur d'Inscription (`Controllers/studentController.js`)
- Fonction `registerStudent` pour créer un nouveau compte étudiant
- Utilise `bcrypt` pour hacher le mot de passe

### Route d'Inscription (`Routes/studentRoutes.js`)
- `POST /api/students/register` → Inscription étudiant

### Contrôleur d'Authentification (`Controllers/authController.js`)
- Vérifie d'abord si l'utilisateur est un étudiant
- Vérifie si l'étudiant fait partie du staff d'un organisateur
- Retourne les informations avec le rôle 'student'

---

## 🧪 Comment Tester

### Utiliser le script de test
```bash
cd backend
node test-student-auth.js
```

### Exemple avec curl

**Inscription :**
```bash
curl -X POST http://localhost:5000/api/students/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jean Dupont",
    "cne": "B987654321",
    "email": "jean.dupont@uiz.ac.ma",
    "phone": "0698765432",
    "filiere": "Mathematiques",
    "niveau": "M1",
    "password": "Student@1234"
  }'
```

**Connexion :**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean.dupont@uiz.ac.ma",
    "password": "Student@1234"
  }'
```

---

## 🔐 Informations de Test Créées

- **Nom** : Ahmed Benali
- **Email** : ahmed.benali@uiz.ac.ma
- **CNE** : A123456789
- **Mot de passe** : Student@1234
- **Filière** : Informatique
- **Niveau** : L3
