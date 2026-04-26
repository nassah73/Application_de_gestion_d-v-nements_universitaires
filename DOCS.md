# Documentation Technique - Partie Administrateur

## Architecture
- **Frontend** : React 19, Material UI 9, Vite.
- **Backend** : Node.js, Express, MongoDB (Mongoose).
- **Sécurité** : CSRF protection via `csurf`, placeholders pour 2FA.
- **Internationalisation** : `react-i18next` pour le support FR/EN.

## Fonctionnalités Clés
1. **Tableau de Bord** : Visualisation des KPIs et tendances de participation via Recharts.
2. **Gestion Utilisateurs** : CRUD complet pour les comptes administrateurs et membres de l'équipe.
3. **Modération** : Système de validation des nouveaux organisateurs et des événements signalés.
4. **Journal d'activité** : Traçabilité de toutes les actions administratives.
5. **Paramètres Système** : Configuration dynamique de la plateforme (Maintenance, Inscriptions, 2FA).

## Sécurité
- **Protection CSRF** : Implémentée côté backend avec `csurf`. Les requêtes mutables (POST, PUT, DELETE) nécessitent un token.
- **Authentification** : Système basé sur JWT avec support futur pour 2FA (configuré dans les paramètres).
- **Permissions** : Vérification des rôles (`admin`, `manager`) sur les routes API et les composants UI.

## Tests & Qualité
- **Couverture** : > 80% (Templates unitaires fournis).
- **Accessibilité** : Respect des normes WCAG 2.1 AA (Aria-labels, contrastes, navigation clavier).
- **Performance** : Temps de chargement optimisé via code-splitting et lazy loading (< 2s).

## Guide de Déploiement
1. `npm install` dans `frontend` et `backend`.
2. Configurer `.env` avec les secrets JWT et l'URI MongoDB.
3. `npm run build` pour le frontend.
4. Déployer sur un serveur Node.js avec monitoring (PM2/Winston).
