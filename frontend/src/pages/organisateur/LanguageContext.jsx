import React, { createContext, useState, useContext, useEffect } from 'react';

const translations = {
  fr: {
    dashboard: 'Tableau de Bord',
    my_events: 'Mes Événements',
    create_event: 'Créer Événement',
    scanner: 'Scanner QR',
    stats: 'Statistiques',
    guide: 'Guide',
    profile: 'Mon Profil',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    platform: 'Plateforme',
    console: 'Console Organisateur',
    notifications: 'Notifications',
    unread: 'non lue(s)',
    mark_read: 'Tout marquer lu',
    no_notif: 'Aucune notification',
    end_notif: 'Fin des notifications',
    logged_in_as: 'Connecté en tant que',
    lang_pref: 'Langue de l\'interface',
    
    // Settings specific
    settings_title: 'Paramètres du Compte',
    settings_desc: 'Gérez vos préférences de l\'application et la sécurité de votre compte.',
    save_changes: 'Sauvegarder les modifications',
    notif_prefs: 'Préférences de notifications',
    email_notif: 'Notifications par Email',
    email_notif_desc: 'Recevez un résumé des inscriptions à vos événements.',
    push_notif: 'Notifications Push (Navigateur)',
    push_notif_desc: 'Soyez alerté en temps réel lors d\'une action importante.',
    sms_notif: 'Alertes SMS',
    sms_notif_desc: 'Seulement pour les alertes de sécurité critiques.',
    security: 'Sécurité et Mot de Passe',
    current_pass: 'Mot de passe actuel',
    new_pass: 'Nouveau mot de passe',
    confirm_pass: 'Confirmer le mot de passe',
    update_pass: 'Mettre à jour le mot de passe',
    app_prefs: 'Préférences d\'Application',
    date_format: 'Format de date',
  },
  ar: {
    dashboard: 'لوحة القيادة',
    my_events: 'أحداثي',
    create_event: 'إنشاء حدث',
    scanner: 'ماسح QR',
    stats: 'الإحصائيات',
    guide: 'الدليل',
    profile: 'ملفي الشخصي',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    platform: 'المنصة',
    console: 'وحدة تحكم المنظم',
    notifications: 'الإشعارات',
    unread: 'غير مقروءة',
    mark_read: 'تحديد الكل كمقروء',
    no_notif: 'لا توجد إشعارات',
    end_notif: 'نهاية الإشعارات',
    logged_in_as: 'مسجل الدخول كـ',
    lang_pref: 'لغة الواجهة',

    settings_title: 'إعدادات الحساب',
    settings_desc: 'إدارة تفضيلات التطبيق وأمان حسابك.',
    save_changes: 'حفظ التغييرات',
    notif_prefs: 'تفضيلات الإشعارات',
    email_notif: 'إشعارات البريد الإلكتروني',
    email_notif_desc: 'تلقي ملخص التسجيلات لأحداثك.',
    push_notif: 'إشعارات لحظية (المتصفح)',
    push_notif_desc: 'احصل على تنبيه في الوقت الفعلي عند اتخاذ إجراء مهم.',
    sms_notif: 'تنبيهات SMS',
    sms_notif_desc: 'فقط للتنبيهات الأمنية الحرجة.',
    security: 'الأمان وكلمة المرور',
    current_pass: 'كلمة المرور الحالية',
    new_pass: 'كلمة المرور الجديدة',
    confirm_pass: 'تأكيد كلمة المرور',
    update_pass: 'تحديث كلمة المرور',
    app_prefs: 'تفضيلات التطبيق',
    date_format: 'تنسيق التاريخ',
  },
  en: {
    dashboard: 'Dashboard',
    my_events: 'My Events',
    create_event: 'Create Event',
    scanner: 'QR Scanner',
    stats: 'Statistics',
    guide: 'Guide',
    profile: 'My Profile',
    settings: 'Settings',
    logout: 'Logout',
    platform: 'Platform',
    console: 'Organizer Console',
    notifications: 'Notifications',
    unread: 'unread',
    mark_read: 'Mark all as read',
    no_notif: 'No notifications',
    end_notif: 'End of notifications',
    logged_in_as: 'Logged in as',
    lang_pref: 'Interface Language',

    settings_title: 'Account Settings',
    settings_desc: 'Manage your app preferences and account security.',
    save_changes: 'Save Changes',
    notif_prefs: 'Notification Preferences',
    email_notif: 'Email Notifications',
    email_notif_desc: 'Receive a summary of registrations for your events.',
    push_notif: 'Push Notifications',
    push_notif_desc: 'Get alerted in real-time on important actions.',
    sms_notif: 'SMS Alerts',
    sms_notif_desc: 'Only for critical safety alerts.',
    security: 'Security & Password',
    current_pass: 'Current Password',
    new_pass: 'New Password',
    confirm_pass: 'Confirm Password',
    update_pass: 'Update Password',
    app_prefs: 'App Preferences',
    date_format: 'Date Format',
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
