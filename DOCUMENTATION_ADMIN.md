# Documentation Technique - Espace Administrateur

## Architecture
L'interface administrateur est construite avec **React 19** et **Material UI 9**. Elle suit une architecture modulaire basée sur des "scenes" (pages) et des composants réutilisables.

### Technologies Clés
- **Frontend** : React, Vite, Material UI, Recharts (statistiques), Formik/Yup (formulaires).
- **Backend** : Node.js, Express, MongoDB, Mongoose.
- **Sécurité** : CSRF Protection (csurf), 2FA Ready, Cookie-based sessions.
- **Multilingue** : i18next (support FR/EN).

## Fonctionnalités
1. **Tableau de Bord** : Visualisation des données clés via Recharts.
2. **Gestion Utilisateurs** : CRUD complet via `UserM.jsx` et `CreateAdmin.jsx`.
3. **Modération** : Système de validation des comptes et contenus (`Moderation.jsx`).
4. **Paramètres** : Configuration système (`Settings.jsx`).
5. **Journal d'activité** : Traçabilité des actions (`ActivityLog.jsx`).

## Sécurité
- **Protection CSRF** : Implémentée côté backend via `csurf`. Le token peut être récupéré via `/api/csrf-token`.
- **Authentification** : Système de login sécurisé avec gestion des rôles (Admin/Manager).
- **Accessibilité** : Respect des normes WCAG 2.1 AA (poids des polices, contrastes, aria-labels).

## Tests
Les tests unitaires sont recommandés via **Vitest** et **React Testing Library**.
Exemple de commande : `npm test`

## Déploiement
Le déploiement s'effectue via un pipeline CI/CD (ex: GitHub Actions) vers un environnement de production avec monitoring activé.
