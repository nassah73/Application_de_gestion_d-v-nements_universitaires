import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Mail, BookOpen, Lock, UserPlus } from 'lucide-react';
import Icon_image from "../../assets/Masters_et_Masters_Spécialisés_à_la_FP_Taroudant_2020-2021-removebg-preview.png";
import style from './style.module.css';

export default function RegisterStudent() {
    return (
      <div className={style.content}>
        <div className={style.container}>
            
            <div className={style.bgLogin}>
                <img src={Icon_image} alt="Logo" />
                <h2>Espace Étudiant</h2>
                <p>Rejoignez la plateforme et accédez à tous les événements de l'université en un clic.</p>
            </div>

            <div className={style.formSection} style={{ padding: '30px 60px' }}>
                <h1 >Inscription</h1>
                <p className={style.subtitle} style={{ marginBottom: '20px' }}>Créez votre compte étudiant</p>

                <form>
                    <div className={style.inputGroup} style={{ marginBottom: '15px' }}>
                        <label>Nom et Prénom</label>
                        <div className={style.inputWrapper}>
                            <input type="text" placeholder="John Doe" required />
                            <User className={style.inputIcon} size={18} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className={style.inputGroup} style={{ marginBottom: '15px' }}>
                        <label>Adresse Email</label>
                        <div className={style.inputWrapper}>
                            <input type="email" placeholder="john@edu.uiz.ac.ma" required />
                            <Mail className={style.inputIcon} size={18} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className={style.inputRow} style={{ marginBottom: '15px', gap: '10px' }}>
                        <div className={style.inputGroup} style={{ marginBottom: '0', width: '50%' }}>
                            <label>Filière</label>
                            <div className={style.inputWrapper}>
                                <select name="filiere" id="filiere" required defaultValue="">
                                    <option value="" disabled>Sélectionner une filière</option>
                                    <option value="PC">PC - Physique-Chimie</option>
                                    <option value="MI">MI - Mathématiques et Informatique</option>
                                    <option value="SHS">SHS - Sciences Humaines & Sociales</option>
                                    <option value="SEG">SEG - Sciences Économiques & Gestion</option>
                                    <option value="ST">ST - Sciences & Techniques</option>
                                </select> 
                                <BookOpen className={style.inputIcon} size={18} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className={style.inputGroup} style={{ marginBottom: '0', width: '50%' }}>
                            <label>Mot de passe</label>
                            <div className={style.inputWrapper}>
                                <input type="password" placeholder="********" required />
                                <Lock className={style.inputIcon} size={18} strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className={style.submitBtn}>
                        Créer mon compte <UserPlus size={20} strokeWidth={2.5} />
                    </button>
                </form>

                <div className={style.formFooter} style={{ marginTop: '20px' }}>
                    S'inscrire en tant qu'<NavLink to="/register-organisateur">Organisateur</NavLink>
                    <br/><br/>
                    Déjà membre ? 
                    <NavLink to="/login">Se Connecter</NavLink>
                </div>
            </div>

        </div>
      </div> 
    );
}