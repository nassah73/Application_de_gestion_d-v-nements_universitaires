import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Lock, Hash, ArrowRight, Mail, ArrowLeft } from 'lucide-react';
import Icon_image from "../../assets/Masters_et_Masters_Spécialisés_à_la_FP_Taroudant_2020-2021-removebg-preview.png";
import axios from 'axios';
import style from './style.module.css'; 

export default function ResetPassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/reset-password', formData);
            if (response.status === 200) {
                setSuccess(true);
            }
        } catch (error) {
            console.error("Erreur ❌", error.response?.data || error.message);
            const message = error.response?.data?.message || "Erreur lors de la réinitialisation";
            setErrorMessage(message);
            alert(message);
        }
    };

    return (
        <div className={style.content}>
            <div className={style.container}>
                <div className={style.bgLogin}>
                    <img src={Icon_image} alt="Logo FP Taroudant" />
                    <h2>Nouveau Mot de Passe</h2>
                    <p>Entrez le code reçu et votre nouveau mot de passe.</p>
                </div>

                <div className={style.formSection}>
                    {!success ? (
                        <>
                            <h1>Réinitialiser le mot de passe</h1>
                            <p className={style.subtitle}>Entrez le code reçu par email et votre nouveau mot de passe.</p>

                            {errorMessage && (
                                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                                    {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Email */}
                                <div className={style.inputGroup}>
                                    <label>Email</label>
                                    <div className={style.inputWrapper}>
                                        <input 
                                            type="email" 
                                            placeholder="votre-email@uiz.ac.ma"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            required 
                                        />
                                        <Mail className={style.inputIcon} size={20} strokeWidth={2.5} />
                                    </div>
                                </div>

                                {/* Code OTP */}
                                <div className={style.inputGroup}>
                                    <label>Code de vérification (OTP)</label>
                                    <div className={style.inputWrapper}>
                                        <input 
                                            type="text" 
                                            placeholder="123456"
                                            value={formData.otp}
                                            onChange={(e) => setFormData({...formData, otp: e.target.value})}
                                            required 
                                        />
                                        <Hash className={style.inputIcon} size={20} />
                                    </div>
                                </div>

                                {/* Nouveau Password */}
                                <div className={style.inputGroup}>
                                    <label>Nouveau mot de passe</label>
                                    <div className={style.inputWrapper}>
                                        <input 
                                            type="password" 
                                            placeholder="••••••••"
                                            value={formData.newPassword}
                                            onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                                            required 
                                        />
                                        <Lock className={style.inputIcon} size={20} />
                                    </div>
                                </div>

                                <button type="submit" className={style.submitBtn}>
                                    Changer le mot de passe <ArrowRight size={20} />
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                                Mot de passe modifié avec succès !
                            </div>
                            <button onClick={() => navigate('/auth/login')} className={style.submitBtn}>
                                Retour à la connexion <ArrowLeft size={20} strokeWidth={2.5} />
                            </button>
                        </div>
                    )}

                    <div className={style.formFooter}>
                        Vous vous en souvenez ?
                        <NavLink to="/auth/login">Se connecter</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}