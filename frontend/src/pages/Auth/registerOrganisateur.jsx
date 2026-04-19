import React from 'react';
import { NavLink } from 'react-router-dom';
import { Building, Mail, FileText, Lock, CheckCircle, Info } from 'lucide-react';
import Icon_image from "../../assets/Masters_et_Masters_Spécialisés_à_la_FP_Taroudant_2020-2021-removebg-preview.png";
import style from './style.module.css';

export default function RegisterOrganisateur() {
    return (
        <div className={style.content}>
            <div className={style.container}>

                <div className={style.bgLogin}>
                    <img src={Icon_image} alt="Logo" />
                    <h2>Espace Organisateur</h2>
                    <p>Publiez et gérez vos événements académiques avec une audience de milliers d'étudiants.</p>
                </div>

                <div className={style.formSection} style={{ padding: '30px 60px' }}>
                    <h1 style={{ fontSize: '2rem' }}>Organisateur</h1>
                    <p className={style.subtitle} style={{ marginBottom: '20px' }}>Création de compte Club / Association</p>

                    <form >
                        <div className={style.inputGroup} style={{ marginBottom: '15px' }}>
                            <label>Nom du Club / Association</label>
                            <div className={style.inputWrapper}>
                                <input type="text" placeholder="Ex: Club Informatique" required />
                                <Building className={style.inputIcon} size={18} strokeWidth={2.5} />
                            </div>
                        </div>

                        <div className={style.inputGroup} style={{ marginBottom: '15px' }}>
                            <label>Adresse Email </label>
                            <div className={style.inputWrapper}>
                                <input type="email" placeholder="exemple@gmail.com" required />
                                <Mail className={style.inputIcon} size={18} strokeWidth={2.5} />
                            </div>
                        </div>

                        <div className={style.inputGroup} style={{ marginBottom: '15px' }}>
                            <label>Justificatif (Attestation/CV/...)</label>
                            <div className={style.inputWrapper}>
                                <input type="file" required style={{ paddingLeft: '50px' }} />
                                <FileText className={style.inputIcon} size={18} strokeWidth={2.5} />
                            </div>
                        </div>

                        <div className={style.inputGroup} style={{ marginBottom: '20px' }}>
                            <label>Mot de passe</label>
                            <div className={style.inputWrapper}>
                                <input type="password" placeholder="*******" required />
                                <Lock className={style.inputIcon} size={18} strokeWidth={2.5} />
                            </div>
                        </div>

                        <div className={style.infoText}>
                            <Info size={16} /> Validation par l'administration (72h)
                        </div>

                        <button type="submit" className={style.submitBtn}>
                            Soumettre une demande  <CheckCircle size={20} strokeWidth={2.5} />
                        </button>
                    </form>

                    <div className={style.formFooter} style={{ marginTop: '20px' }}>
                        S'inscrire en tant qu'<NavLink to="/register-student">Étudiant</NavLink>
                        <br /><br />
                        Déjà membre ?
                        <NavLink to="/login">Se Connecter</NavLink>
                    </div>
                </div>

            </div>
        </div>
    );
}