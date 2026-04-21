import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';// pour les icons 
import Icon_image from "../../assets/Masters_et_Masters_Spécialisés_à_la_FP_Taroudant_2020-2021-removebg-preview.png";
import style from './style.module.css';

export default function Login() {
    const Navigate = useNavigate();
    const [role, setRole] = useState('student');

    const handleLogin = () => {
        if (role === 'student') Navigate('/app/Home');
        else if (role === 'organizer') Navigate('/organisateur');
        else if (role === 'admin') Navigate('/responsable');
    };

    return (
      <div className={style.content}>
        <div className={style.container}>
            
            
            <div className={style.bgLogin}>
                <img src={Icon_image} alt="Logo FP Taroudant" />
                <h2>Bienvenue à l'UIZ</h2>
                <p>Le portail  pour gérer tous les evenement à l'université de taroudant .</p>
            </div>

            
            <div className={style.formSection}>
                <h1>Connexion</h1>
                <p className={style.subtitle}>Accédez à votre espace événementiel</p>

                <form >
                    <div className={style.inputGroup}>
                        <label htmlFor="email">Adresse Email</label>
                        <div className={style.inputWrapper}>
                            <input type="email" name="email" id="email" placeholder="etudiant@edu.uiz.ac.ma" />
                            <Mail className={style.inputIcon} size={20} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className={style.inputGroup}>
                        <label htmlFor="password">Mot de passe</label>
                        <div className={style.inputWrapper}>
                            <input type="password" name="password" id="password" placeholder="Votre mot de passe secret" />
                            <Lock className={style.inputIcon} size={20} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className={style.inputGroup}>
                        <label htmlFor="role">Connexion en tant que</label>
                        <div className={style.inputWrapper}>
                            <select 
                                name="role" 
                                id="role" 
                                value={role} 
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="student">Étudiant</option>
                                <option value="organizer">Organisateur</option>
                            </select>
                        </div>
                    </div>

                    <button type="button" className={style.submitBtn} onClick={handleLogin}>
                        Se Connecter <ArrowRight size={20} strokeWidth={2.5} />
                    </button>
                </form>

                <div className={style.formFooter}>
                    Vous n'avez pas de compte ? 
                    <NavLink to="/register-student">S'inscrire</NavLink>
                </div>
            </div>

        </div>
      </div> 
    );
}