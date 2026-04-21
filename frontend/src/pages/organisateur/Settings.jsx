import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Globe, Lock, Save, Smartphone } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });

  const toggleNotif = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <SettingsIcon size={32} className="text-orange-500" /> {t('settings_title')}
          </h2>
          <p className="text-slate-500 mt-2 font-medium">{t('settings_desc')}</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 shadow-lg text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-2 transition-all">
          <Save size={18} /> {t('save_changes')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Bell className="text-orange-500" /> {t('notif_prefs')}
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-700">{t('email_notif')}</p>
                <p className="text-sm text-slate-400">{t('email_notif_desc')}</p>
              </div>
              <button onClick={() => toggleNotif('email')} className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${notifications.email ? 'bg-orange-500' : 'bg-slate-200'}`}>
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${notifications.email ? (language === 'ar' ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-700">{t('push_notif')}</p>
                <p className="text-sm text-slate-400">{t('push_notif_desc')}</p>
              </div>
              <button onClick={() => toggleNotif('push')} className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${notifications.push ? 'bg-orange-500' : 'bg-slate-200'}`}>
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${notifications.push ? (language === 'ar' ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-700 flex items-center gap-2">{t('sms_notif')} <Smartphone size={14} className="text-slate-400"/></p>
                <p className="text-sm text-slate-400">{t('sms_notif_desc')}</p>
              </div>
              <button onClick={() => toggleNotif('sms')} className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${notifications.sms ? 'bg-orange-500' : 'bg-slate-200'}`}>
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${notifications.sms ? (language === 'ar' ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Security / Password */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Shield className="text-emerald-500" /> {t('security')}
          </h3>
          
          <form className="space-y-4">
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('current_pass')}</label>
              <div className="relative mt-1">
                <Lock className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} size={16} />
                <input type="password" placeholder="••••••••" className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3 ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} focus:outline-none focus:border-emerald-500`} />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('new_pass')}</label>
              <div className="relative mt-1">
                <Lock className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} size={16} />
                <input type="password" placeholder="••••••••" className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3 ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} focus:outline-none focus:border-emerald-500`} />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('confirm_pass')}</label>
              <div className="relative mt-1">
                <Lock className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} size={16} />
                <input type="password" placeholder="••••••••" className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3 ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} focus:outline-none focus:border-emerald-500`} />
              </div>
            </div>
            
            <button type="button" className="w-full mt-2 bg-slate-900 text-white font-bold rounded-xl py-3 hover:bg-slate-800 transition-colors">
              {t('update_pass')}
            </button>
          </form>
        </div>

        {/* Preferences */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Globe className="text-blue-500" /> {t('app_prefs')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">{t('lang_pref')}</label>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 text-slate-700 font-bold appearance-none cursor-pointer"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="ar">العربية (Arabe)</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">{t('date_format')}</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 text-slate-700 font-bold appearance-none cursor-pointer">
                <option value="eu">JJ/MM/AAAA</option>
                <option value="us">MM/JJ/AAAA</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
