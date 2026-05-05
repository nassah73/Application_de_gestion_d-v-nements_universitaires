# Mot de passe oublié et Réinitialisation

## ✅ Tests Réussis

Toutes les fonctionnalités ont été testées et fonctionnent parfaitement :

### 1. Génération de l'OTP (Forgot Password)
- **Endpoint** : `POST /api/auth/forgot-password`
- **Statut** : ✅ Succès (200)
- **Réponse** :
  ```json
  {
    "message": "Code de réinitialisation généré avec succès !",
    "otp": "205567",
    "note": "Pour la démo, l'OTP est retourné directement. En production, il serait envoyé par email."
  }
  ```

### 2. Réinitialisation du mot de passe (Reset Password)
- **Endpoint** : `POST /api/auth/reset-password`
- **Statut** : ✅ Succès (200)
- **Message** : "Mot de passe modifié avec succès"

### 3. Connexion avec le nouveau mot de passe
- **Endpoint** : `POST /api/auth/login`
- **Statut** : ✅ Succès (200)
- Le nouveau mot de passe fonctionne correctement

### 4. Email non existant
- **Endpoint** : `POST /api/auth/forgot-password`
- **Statut** : ✅ Erreur (404)
- **Message** : "Cet email n'existe pas dans notre système"

---

## 📝 Fichiers Modifiés

### 1. Modèles Mise à Jour
Tous les modèles utilisateur ont reçu les champs suivants :
- `resetOTP`: Stocke le code OTP
- `resetOTPExpires`: Date d'expiration de l'OTP (15 minutes)

Fichiers modifiés :
- `models/Student.js`
- `models/Organisateur.js`
- `models/Administrateur.js`
- `models/Administration.js`

### 2. Contrôleur d'Authentification
- `Controllers/authController.js:97` - Fonction `forgotPassword()` mise à jour
- `Controllers/authController.js:147` - Fonction `resetPassword()` mise à jour

---

## 🔐 Endpoints API

### 1. Générer un OTP
**POST** `/api/auth/forgot-password`

**Corps de la requête :**
```json
{
  "email": "utilisateur@example.com"
}
```

**Réponse en cas de succès (200) :**
```json
{
  "message": "Code de réinitialisation généré avec succès !",
  "otp": "123456",
  "note": "Pour la démo, l'OTP est retourné directement. En production, il serait envoyé par email."
}
```

**Erreur (404) :**
```json
{
  "message": "Cet email n'existe pas dans notre système"
}
```

### 2. Réinitialiser le mot de passe
**POST** `/api/auth/reset-password`

**Corps de la requête :**
```json
{
  "email": "utilisateur@example.com",
  "otp": "123456",
  "newPassword": "NouveauMotDePasse@123"
}
```

**Réponse en cas de succès (200) :**
```json
{
  "message": "Mot de passe modifié avec succès"
}
```

**Erreurs possibles :**
- 400 : "Code de vérification incorrect"
- 400 : "Le code a expiré"
- 404 : "Utilisateur non trouvé"

---

## 📋 Fonctionnalités Implémentées

✅ Vérifie l'email dans tous les modèles (Student, Organisateur, Administrateur, Administration)  
✅ Génère un OTP aléatoire à 6 chiffres  
✅ Stocke l'OTP avec une date d'expiration (15 minutes)  
✅ Valide l'OTP lors de la réinitialisation  
✅ Vérifie que l'OTP n'a pas expiré  
✅ Hache le nouveau mot de passe avec bcrypt  
✅ Supprime l'OTP après utilisation  

---

## 🧪 Tester avec curl

### Générer un OTP :
```bash
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "ahmed.benali@uiz.ac.ma"}'
```

### Réinitialiser le mot de passe :
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmed.benali@uiz.ac.ma",
    "otp": "123456",
    "newPassword": "MonNouveauMotDePasse@123"
  }'
```

### Exécuter les tests automatisés :
```bash
cd backend
node test-forgot-reset.js
```

---

## 🔒 Améliorations Production

Pour passer en production :
1. Configurer Nodemailer avec un vrai service d'email (Gmail, SendGrid, etc.)
2. Ne pas retourner l'OTP dans la réponse, l'envoyer uniquement par email
3. Ajouter un taux de limitation (rate limiting)
4. Ajouter un délai entre les requêtes OTP
5. Consigner toutes les tentatives de réinitialisation
