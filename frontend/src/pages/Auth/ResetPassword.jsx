import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Hash, ArrowRight } from 'lucide-react';
import axios from 'axios';
import style from './style.module.css'; // استعمل نفس الستايل باش يبقاو متشابهين

export default function ResetPassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // هاد الـ Route غاتصاوبو في الـ Backend من بعد
            const response = await axios.post('http://localhost:5000/api/auth/reset-password', formData);
            
            if (response.status === 200) {
                alert("Mot de passe modifié avec succès !");
                navigate('/auth/login'); // رجعو لصفحة الدخول
            }
        } catch (error) {
            alert(error.response?.data?.message || "Erreur lors de la réinitialisation");
        }
    };

    return (
        <div className={style.content}>
            <div className={style.container}>
                <div className={style.formSection}>
                    <h1>Nouveau mot de passe</h1>
                    <p className={style.subtitle}>Entrez le code reçu par email et votre nouveau mot de passe.</p>

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className={style.inputGroup}>
                            <label>Email</label>
                            <div className={style.inputWrapper}>
                                <input 
                                    type="email" 
                                    placeholder="votre-email@uiz.ac.ma"
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Code OTP */}
                        <div className={style.inputGroup}>
                            <label>Code de vérification (OTP)</label>
                            <div className={style.inputWrapper}>
                                <input 
                                    type="text" 
                                    placeholder="123456"
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
                </div>
            </div>
        </div>
    );
}