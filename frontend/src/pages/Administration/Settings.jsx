import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Lock,
  Save,
  CheckCircle2,
  X,
} from "lucide-react";

import Sidebare from "./components/Sidebare";
import Tobar from "./components/Tobar";

const AdminSettings = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [profileForm, setProfileForm] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    email: "",
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userStr = localStorage.getItem("user");

        if (!userStr) {
          navigate("/auth/login");
          return;
        }

        const user = JSON.parse(userStr);

        const response = await fetch(
          `http://localhost:5000/api/administrateur/administration/${user._id}`
        );

        if (response.ok) {
          const data = await response.json();

          setUserData(data);

          setProfileForm({
            prenom: data.prenom || "",
            nom: data.nom || "",
            telephone: data.telephone || "",
            email: data.email || "",
          });
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleProfileSave = async (e) => {
    e.preventDefault();

    try {
      const userStr = localStorage.getItem("user");

      if (!userStr) return;

      const user = JSON.parse(userStr);

      const response = await fetch(
        `http://localhost:5000/api/administrateur/administration/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileForm),
        }
      );

      if (response.ok) {
        showToast("Paramètres enregistrés avec succès !");

        const updatedUser = {
          ...JSON.parse(userStr),
          ...profileForm,
          displayName: `${profileForm.prenom} ${profileForm.nom}`,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        showToast("Erreur lors de la sauvegarde", "error");
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);

      showToast("Erreur lors de la sauvegarde", "error");
    }
  };

  const handleSecuritySave = async (e) => {
    e.preventDefault();

    if (
      securityForm.newPassword !==
      securityForm.confirmPassword
    ) {
      showToast(
        "Les mots de passe ne correspondent pas",
        "error"
      );

      return;
    }

    try {
      const userStr = localStorage.getItem("user");

      if (!userStr) return;

      const user = JSON.parse(userStr);

      const response = await fetch(
        `http://localhost:5000/api/administrateur/administration/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: securityForm.newPassword,
          }),
        }
      );

      if (response.ok) {
        showToast("Mot de passe mis à jour avec succès !");

        setSecurityForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        showToast(
          "Erreur lors de la mise à jour",
          "error"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);

      showToast(
        "Erreur lors de la mise à jour",
        "error"
      );
    }
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{
          background:
            "radial-gradient(circle at top left, #172554 0%, #0f172a 45%, #020617 100%)",
        }}
      >
        <div className="text-white text-lg font-bold">
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex h-screen overflow-hidden font-sans"
      style={{
        background:
          "radial-gradient(circle at top left, #172554 0%, #0f172a 45%, #020617 100%)",
      }}
    >
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-sm font-bold backdrop-blur-xl border animate-in fade-in slide-in-from-top-2"
          style={{
            background:
              toast.type === "success"
                ? "rgba(16,185,129,0.18)"
                : "rgba(239,68,68,0.18)",

            borderColor:
              toast.type === "success"
                ? "rgba(16,185,129,0.3)"
                : "rgba(239,68,68,0.3)",

            color: "#fff",
          }}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <X size={18} />
          )}

          {toast.msg}
        </div>
      )}

      <Sidebare />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Tobar />

        <div className="p-8 overflow-y-auto flex-1">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-4xl font-black text-white tracking-tight">
                Paramètres
              </h1>

              <p className="text-white/40 mt-2 text-sm">
                Gérez vos informations personnelles et
                votre sécurité.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full lg:w-64 shrink-0">
                <div
                  className="rounded-3xl border p-3 backdrop-blur-xl shadow-2xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor:
                      "rgba(255,255,255,0.08)",
                  }}
                >
                  {[
                    {
                      key: "profile",
                      icon: <User size={18} />,
                      label: "Mon Profil",
                    },
                    {
                      key: "security",
                      icon: <Lock size={18} />,
                      label: "Sécurité",
                    },
                  ].map(({ key, icon, label }) => (
                    <button
                      key={key}
                      onClick={() =>
                        setActiveSection(key)
                      }
                      className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-bold text-sm transition-all duration-300 text-left border mb-2 ${
                        activeSection === key
                          ? "text-white shadow-xl scale-[1.02]"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                      style={{
                        background:
                          activeSection === key
                            ? "linear-gradient(135deg,#cd7329,#ea580c)"
                            : "transparent",

                        borderColor:
                          activeSection === key
                            ? "rgba(255,255,255,0.1)"
                            : "transparent",
                      }}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* PROFILE */}
                {activeSection === "profile" && (
                  <div
                    className="rounded-[30px] border p-8 md:p-10 backdrop-blur-2xl shadow-2xl animate-in fade-in"
                    style={{
                      background:
                        "rgba(255,255,255,0.05)",

                      borderColor:
                        "rgba(255,255,255,0.08)",
                    }}
                  >
                    {/* Avatar */}
                    <div className="flex items-center gap-5 mb-10">
                      <div
                        className="w-20 h-20 rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-xl"
                        style={{
                          background:
                            "linear-gradient(135deg,#cd7329,#f97316)",
                        }}
                      >
                        {profileForm.prenom?.[0]}
                        {profileForm.nom?.[0]}
                      </div>

                      <div>
                        <h2 className="text-2xl font-black text-white">
                          {profileForm.prenom}{" "}
                          {profileForm.nom}
                        </h2>

                      </div>
                    </div>

                    <form
                      onSubmit={handleProfileSave}
                      className="space-y-7"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Prénom">
                          <input
                            type="text"
                            className="field-input"
                            value={profileForm.prenom}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                prenom:
                                  e.target.value,
                              })
                            }
                            required
                          />
                        </Field>

                        <Field label="Nom">
                          <input
                            type="text"
                            className="field-input"
                            value={profileForm.nom}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                nom: e.target.value,
                              })
                            }
                            required
                          />
                        </Field>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Téléphone">
                          <input
                            type="text"
                            className="field-input"
                            value={profileForm.telephone}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                telephone:
                                  e.target.value,
                              })
                            }
                            required
                          />
                        </Field>

                        <Field label="Email">
                          <input
                            type="email"
                            className="field-input"
                            value={profileForm.email}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                email:
                                  e.target.value,
                              })
                            }
                            required
                          />
                        </Field>
                      </div>

                      <SaveBtn label="Sauvegarder les modifications" />
                    </form>
                  </div>
                )}

                {/* SECURITY */}
                {activeSection === "security" && (
                  <div
                    className="rounded-[30px] border p-8 md:p-10 backdrop-blur-2xl shadow-2xl animate-in fade-in"
                    style={{
                      background:
                        "rgba(255,255,255,0.05)",

                      borderColor:
                        "rgba(255,255,255,0.08)",
                    }}
                  >
                    <h2 className="text-2xl font-black text-white mb-2">
                      Sécurité
                    </h2>

                    <p className="text-white/40 text-sm mb-10">
                      Modifiez votre mot de passe pour
                      sécuriser votre compte.
                    </p>

                    <form
                      onSubmit={handleSecuritySave}
                      className="space-y-7"
                    >
                      <Field label="Mot de passe actuel">
                        <input
                          type="password"
                          className="field-input"
                          placeholder="••••••••"
                          value={
                            securityForm.currentPassword
                          }
                          onChange={(e) =>
                            setSecurityForm({
                              ...securityForm,
                              currentPassword:
                                e.target.value,
                            })
                          }
                          required
                        />
                      </Field>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Nouveau mot de passe">
                          <input
                            type="password"
                            className="field-input"
                            value={
                              securityForm.newPassword
                            }
                            onChange={(e) =>
                              setSecurityForm({
                                ...securityForm,
                                newPassword:
                                  e.target.value,
                              })
                            }
                            required
                          />
                        </Field>

                        <Field label="Confirmation">
                          <input
                            type="password"
                            className="field-input"
                            value={
                              securityForm.confirmPassword
                            }
                            onChange={(e) =>
                              setSecurityForm({
                                ...securityForm,
                                confirmPassword:
                                  e.target.value,
                              })
                            }
                            required
                          />
                        </Field>
                      </div>

                      <button
                        type="submit"
                        className="px-8 py-4 rounded-2xl font-black text-white shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                        style={{
                          background:
                            "linear-gradient(135deg,#ef4444,#dc2626)",
                        }}
                      >
                        Mettre à jour
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Styles */}
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
      `}</style>
    </div>
  );
};

const Field = ({ label, children }) => {
  return (
    <div>
      <label className="block text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-3 ml-1">
        {label}
      </label>

      {children}
    </div>
  );
};

const SaveBtn = ({ label }) => {
  return (
    <button
      type="submit"
      className="flex items-center gap-2 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
      style={{
        background:
          "linear-gradient(135deg,#cd7329,#ea580c)",
      }}
    >
      <Save size={18} />

      {label}
    </button>
  );
};

export default AdminSettings;