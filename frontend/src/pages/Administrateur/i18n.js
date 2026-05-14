import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "Statistiques Globales": "Global Statistics",
      "Gestion Utilisateurs": "User Management",
      "Ajouter Admin": "Add Admin",
      "Gestion Catégories": "Category Management",
      "Modération": "Moderation",
      "Paramètres": "Settings",
      "Journal d'activité": "Activity Log",
      "Calendrier": "Calendar",
      "RECHERCHER": "SEARCH",
      "Rechercher...": "Search...",
      "Déconnexion": "Logout",
      "News Hub": "News Hub"
    },
  },
  fr: {
    translation: {
      "Statistiques Globales": "Statistiques Globales",
      "Gestion Utilisateurs": "Gestion Utilisateurs",
      "Ajouter Admin": "Ajouter Admin",
      "Gestion Catégories": "Gestion Catégories",
      "Modération": "Modération",
      "Paramètres": "Paramètres",
      "Journal d'activité": "Journal d'activité",
      "Calendrier": "Calendrier",
      "RECHERCHER": "RECHERCHER",
      "Rechercher...": "Rechercher...",
      "Déconnexion": "Déconnexion",
      "News Hub": "News Hub"
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
