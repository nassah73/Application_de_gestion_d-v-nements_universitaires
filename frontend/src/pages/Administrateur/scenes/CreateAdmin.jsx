import React, { useState } from "react";
import { User, Mail, Lock, Phone, CheckCircle2, X, Eye, EyeOff } from "lucide-react";
import axios from "axios";

const getPasswordStrength = (password) => { 
  if (!password) return { score: 0, label: "", color: "#64748b" }; 
  let score = 0; 
  if (password.length >= 6) score++; 
  if (password.length >= 10) score++; 
  if (/[A-Z]/.test(password)) score++; 
  if (/[0-9]/.test(password)) score++; 
  if (/[^A-Za-z0-9]/.test(password)) score++; 

  if (score <= 1) return { score: 20, label: "Très faible", color: "#ef4444" }; 
  if (score === 2) return { score: 40, label: "Faible", color: "#f97316" }; 
  if (score === 3) return { score: 60, label: "Moyen", color: "#eab308" }; 
  if (score === 4) return { score: 80, label: "Fort", color: "#22c55e" }; 
  return { score: 100, label: "Très fort", color: "#10b981" }; 
};

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const strength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.prenom.trim()) {
      newErrors.prenom = "Prénom requis";
    }
    
    if (!formData.nom.trim()) {
      newErrors.nom = "Nom requis";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email doit contenir @ et .";
    } else if (!/^[^\s@]+@uiz\.ac\.ma$/.test(formData.email)) {
      newErrors.email = "Email doit être @uiz.ac.ma";
    }
    
    const cleanPhone = formData.telephone.replace(/\s/g, '');
    if (!formData.telephone.trim()) {
      newErrors.telephone = "Téléphone requis";
    } else if (!/^\+212[67]\d{8}$/.test(cleanPhone)) {
      newErrors.telephone = "Téléphone doit être +212 suivi de 9 chiffres";
    }
    
    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mot de passe doit contenir au moins 8 caractères";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast("Veuillez remplir tous les champs correctement", "error");
      return;
    }
    
    try {
      const cleanPhone = formData.telephone.replace(/\s/g, '');
      const response = await axios.post('http://localhost:5000/api/administrateur/create-administration', {
        prenom: formData.prenom,
        nom: formData.nom,
        telephone: cleanPhone,
        email: formData.email,
        password: formData.password
      });
      
      showToast(response.data.message || "Compte Administration créé avec succès !");
      
      setFormData({
        prenom: "",
        nom: "",
        email: "",
        telephone: "",
        password: "",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || 'Erreur lors de la création du compte', "error");
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div
      className="h-full overflow-y-auto font-sans"
      style={{
        background: "radial-gradient(circle at top left, #172554 0%, #0f172a 45%, #020617 100%)",
      }}
    >
      {toast && (
        <div
          className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-sm font-bold backdrop-blur-xl border animate-in fade-in slide-in-from-top-2"
          style={{
            background: toast.type === "success" ? "rgba(16,185,129,0.18)" : "rgba(239,68,68,0.18)",
            borderColor: toast.type === "success" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)",
            color: "#fff",
          }}
        >
          {toast.type === "success" ? <CheckCircle2 size={18} /> : <X size={18} />}
          {toast.msg}
        </div>
      )}

      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-white tracking-tight">Créer un compte Administration</h1>
            <p className="text-white/40 mt-2 text-sm">Ajoutez un nouveau compte membre de l'administration au système.</p>
          </div>

          <div
            className="rounded-[30px] border p-8 md:p-10 backdrop-blur-2xl shadow-2xl animate-in fade-in"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field 
                  label="Prénom" 
                  icon={<User size={16} />}
                  error={errors.prenom}
                >
                  <input
                    type="text"
                    className={`field-input ${errors.prenom ? 'border-red-500' : ''}`}
                    value={formData.prenom}
                    onChange={(e) => handleChange('prenom', e.target.value)}
                  />
                </Field>

                <Field 
                  label="Nom" 
                  icon={<User size={16} />}
                  error={errors.nom}
                >
                  <input
                    type="text"
                    className={`field-input ${errors.nom ? 'border-red-500' : ''}`}
                    value={formData.nom}
                    onChange={(e) => handleChange('nom', e.target.value)}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field 
                  label="Email" 
                  icon={<Mail size={16} />}
                  error={errors.email}
                >
                  <input
                    type="email"
                    className={`field-input ${errors.email ? 'border-red-500' : ''}`}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="exemple@uiz.ac.ma"
                  />
                </Field>

                <Field 
                  label="Téléphone" 
                  icon={<Phone size={16} />}
                  error={errors.telephone}
                >
                  <input
                    type="text"
                    className={`field-input ${errors.telephone ? 'border-red-500' : ''}`}
                    value={formData.telephone}
                    onChange={(e) => handleChange('telephone', e.target.value)}
                    placeholder="+212612345678"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <Field 
                  label="Mot de passe" 
                  icon={<Lock size={16} />}
                  error={errors.password}
                >
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`field-input pr-14 ${errors.password ? 'border-red-500' : ''}`}
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="********"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  
                  {formData.password && (
                    <div className="mt-3">
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${strength.score}%`,
                            backgroundColor: strength.color
                          }}
                        />
                      </div>
                      <div className="text-xs font-bold mt-1" style={{ color: strength.color }}>
                        {strength.label}
                      </div>
                    </div>
                  )}
                </Field>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex items-center gap-2 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                  style={{
                    background: "linear-gradient(135deg,#cd7329,#ea580c)",
                  }}
                >
                  <CheckCircle2 size={18} />
                  Créer le compte Administration
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .field-input {
          width: 100%;
          padding: 15px 18px;
          border-radius: 18px;
          font-size: 0.92rem;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(15,23,42,0.65);
          backdrop-filter: blur(12px);
          outline: none;
          transition: all .25s ease;
          font-weight: 500;
        }
        .field-input::placeholder {
          color: rgba(255,255,255,0.25);
        }
        .field-input:hover {
          border-color: rgba(205,115,41,0.3);
        }
        .field-input:focus {
          border-color: #cd7329;
          box-shadow: 0 0 0 4px rgba(205,115,41,0.12);
          background: rgba(15,23,42,0.8);
        }
        .field-input.border-red-500 {
          border-color: #ef4444;
        }
      `}</style>
    </div>
  );
};

const Field = ({ label, icon, children, error }) => {
  return (
    <div>
      <label className="block text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-3 ml-1 flex items-center gap-2">
        {icon && <span style={{ color: 'rgba(255,255,255,0.3)' }}>{icon}</span>}
        {label}
      </label>
      {children}
      {error && (
        <div className="text-xs font-bold text-red-500 mt-2 ml-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default CreateAdmin;
