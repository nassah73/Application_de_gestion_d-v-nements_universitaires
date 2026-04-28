# Cahier des Charges - Plateforme de Gestion d'Événements Universitaires

## 1. INTRODUCTION ET CONTEXTE
### 1.1 Contexte Général
Dans le cadre de son dynamisme académique et social, l'Université Ibn Zohr de Taroudant constitue le théâtre régulier de nombreuses manifestations culturelles, sportives et scientifiques. Toutefois, la gestion opérationnelle de ces activités repose actuellement sur des méthodes manuelles et des outils non centralisés. Cette approche artisanale engendre des lacunes majeures, notamment une communication fragmentée qui peine à atteindre l'ensemble de la communauté estudiantine. De plus, l'absence d'un système automatisé complique rigoureusement le suivi des inscriptions et la gestion des flux de présence lors des événements.

### 1.2 Problématique
L'analyse du système actuel révèle une problématique multidimensionnelle :
- Absence de centralisation des données.
- Gestion archaïque des flux (listes Excel, papier).
- Manque de vérification des présences en temps réel.
- Absence totale d'indicateurs de performance et de statistiques fiables.

### 1.3 Solution Proposée
Développement d'une application web moderne permettant la gestion complète du cycle de vie des événements universitaires, depuis la création jusqu'au suivi post-événement.

## 2. OBJECTIFS DU PROJET
- **Centralisation** : Plateforme unique pour tous les événements.
- **Digitalisation** : Fin des processus papier (0 formulaire papier).
- **Accessibilité** : Disponible 24/7, Responsive design.
- **Traçabilité** : Suivi complet des inscriptions et présences.
- **Engagement** : Augmentation de la participation étudiante.

## 3. PÉRIMÈTRE DU PROJET
Le système repose sur quatre profils utilisateurs : Administrateur, Administration, Organisateur et Étudiant.
- **Inclus** : CRUD événements, moteur de recherche, tickets QR Code, tableaux de bord, notifications email.
- **Exclus V1** : Application mobile native, paiement en ligne (gratuit uniquement), chat temps réel, multilingue (français uniquement).

## 4. ACTEURS ET UTILISATEURS
### 4.1 Définition des Acteurs

#### 4.1.3 Organisateur (Créateur d'Événements)
- **Profil** : Clubs étudiants, associations, professeurs, ou étudiants individuels.
- **Mode d'accès** : Inscription en ligne + validation par l'Administration.
- **Responsabilités** : Création et gestion opérationnelle de leurs propres événements.
- **Droits et Fonctionnalités** :
    - Création et modification de profil organisateur.
    - Soumission d'événements (cycle : Brouillon → En attente → Publié).
    - Gestion des inscriptions et consultation de la liste des participants.
    - Validation des présences le jour J via Scan QR Code.
    - Communication directe avec les participants par email.
    - Accès aux statistiques détaillées de leurs événements.
    - Exportation de la liste des participants (PDF/CSV).
    - Gestion de leur propre staff (attribution de droits de scan).
    - Validation des candidatures de volontaires/staff.

### 4.2 Matrice des Permissions (RBAC)
| Fonctionnalité | Admin | Administration | Organisateur | Étudiant |
| :--- | :---: | :---: | :---: | :---: |
| Créer un événement | ✅ | ✅ | ✅ (après validation) | ❌ |
| Modifier un événement | ✅ (tous) | ✅ (tous) | ✅ (siens) | ❌ |
| Supprimer un événement | ✅ (tous) | ✅ (tous) | ✅ (siens) | ❌ |
| Valider un événement | ✅ | ✅ | ❌ | ❌ |
| Valider présences (Scan) | ❌ | ❌ | ✅ | ✅ (si staff) |
| Voir statistiques | ✅ (global) | ✅ (global) | ✅ (siens) | ❌ |

## 5. SPÉCIFICATIONS FONCTIONNELLES (DÉDIÉES À L'ORGANISATEUR)
### 5.1 Inscription Organisateur
- **Processus** : Soumission d'un formulaire détaillé + justificatif officiel (carte club, attestation).
- **Validation** : Examen par l'Administration (Délai max 72h).
- **Refus** : Possibilité de révision et resoumission en cas de rejet motivé.

### 5.2 Gestion des Événements
- **Création (RG-012)** : Formulaire complet (Titre, Description, Catégorie, Date, Lieu, Capacité, Image).
- **Workflow** : L'organisateur soumet le projet -> L'Administration affecte une salle et valide.
- **Modification** : Libre pour les brouillons. Une fois publié, toute modification majeure nécessite une nouvelle validation.
- **Annulation** : Demande d'annulation motivée soumise à l'Administration. Notification automatique aux inscrits.

### 5.3 Validation des Présences (Jour J)
- **Interface de Scan** : Accessible sur mobile/tablette pour l'organisateur et son staff.
- **Feedback** : Signal visuel immédiat (Vert: OK, Rouge: Erreur/Déjà utilisé).
- **Mode Offline** : Stockage local des scans et synchronisation automatique.

### 5.4 Statistiques et Rapports
- **Tableau de bord** : Taux de remplissage, démographie des inscrits, historique des présences.
- **Exports** : Génération de listes de présence au format PDF pour archivage académique.

## 6. SPÉCIFICATIONS TECHNIQUES
- **Frontend** : React 18, Tailwind CSS, Vite.
- **Backend** : Node.js, Express, MongoDB (Mongoose).
- **Sécurité** : JWT (24h), bcrypt, Rate Limiting, CSRF Protection.
- **Outils** : QR Code (qrcode.js), Fichiers (Cloudinary), Emails (Nodemailer).

## 7. PLANNING ET LIVRABLES
1. **Analyse & Conception** : Cahier des charges, UML, Figma.
2. **Développement Backend** : API REST, Tests unitaires.
3. **Développement Frontend** : Interfaces, Intégration API.
4. **Tests & Qualité** : E2E, Optimisation.
