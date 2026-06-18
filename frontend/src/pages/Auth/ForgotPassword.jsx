import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import Icon_image from "../../assets/Masters_et_Masters_Spécialisés_à_la_FP_Taroudant_2020-2021-removebg-preview.png";
import style from './style.module.css';
import axios from 'axios';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [testOtp, setTestOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            if (response.status === 200) {
                setTestOtp(response.data.testOtp || '');
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Erreur ❌", error.response?.data || error.message);
            const message = error.response?.data?.message || "Une erreur est survenue. Vérifiez votre connexion.";
            setErrorMessage(message);
            alert(message);
        }
    };

    return (
        <div className={style.content}>
            <div className={style.container}>
                <div className={style.bgLogin}>
                    <img src={Icon_image} alt="Logo FP Taroudant" />
                    <h2>Réinitialisation</h2>
                    <p>Ne vous inquiétez pas, nous allons vous aider à retrouver l'accès à votre compte.</p>
                </div>

                <div className={style.formSection}>
                    {!submitted ? (
                        <>
                            <h1>Mot de passe oublié ?</h1>
                            <p className={style.subtitle}>Saisissez votre email pour recevoir un lien de réinitialisation</p>

                            {errorMessage && (
                                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                                    {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className={style.inputGroup}>
                                    <label htmlFor="email">Adresse Email</label>
                                    <div className={style.inputWrapper}>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            placeholder="votre-email@uiz.ac.ma" 
                                            required 
                                        />
                                        <Mail className={style.inputIcon} size={20} strokeWidth={2.5} />
                                    </div>
                                </div>

                                <button type="submit" className={style.submitBtn}>
                                    Envoyer le lien <ArrowRight size={20} strokeWidth={2.5} />
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                                Un code de réinitialisation a été envoyé à <strong>{email}</strong>.
                            </div>
                            {testOtp && (
                                <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-6">
                                    <strong>Code de test (dev only):</strong> {testOtp}
                                </div>
                            )}
                            <button 
                                onClick={() => navigate('/auth/reset-password')} 
                                className={style.submitBtn}
                                style={{marginBottom: '10px'}}
                            >
                                Saisir le code <ArrowRight size={20} />
                            </button>
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
