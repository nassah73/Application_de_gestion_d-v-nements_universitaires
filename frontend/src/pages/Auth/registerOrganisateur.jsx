import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Building, Mail, FileText, Lock, CheckCircle, Info, User, Hash, Phone } from 'lucide-react';
import Icon_image from "../../assets/Masters_et_Masters_Spécialisés_à_la_FP_Taroudant_2020-2021-removebg-preview.png";
import style from './style.module.css';
import axios from 'axios';

export default function RegisterOrganisateur() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        telephone: '',
        nomClub: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/organisateurs/register', formData);
            alert(response.data.message);
            navigate('/auth/login');
        } catch (error) {
            alert(error.response?.data?.message || "Erreur lors de l'inscription");
        }
    };

    return (
        <div className={style.content}>
            <div className={style.container}>

                <div className={style.bgLogin}>
                    <img src={Icon_image} alt="Logo" />
                    <h2>Espace Organisateur</h2>
                    <p>Publiez et gérez vos événements académiques avec une audience de milliers d'étudiants.</p>
                </div>

                <div className={style.formSection} style={{ padding: '30px 60px', overflowY: 'auto', justifyContent: 'flex-start' }}>
                    <h1 style={{ fontSize: '2rem' }}>Organisateur</h1>
                    <p className={style.subtitle} style={{ marginBottom: '20px' }}>Création de compte Club / Association</p>

                    <form onSubmit={handleSubmit}>
                        <div className={style.inputRow} style={{ marginBottom: '12px', gap: '15px' }}>
                            <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                                <label>Prénom</label>
                                <div className={style.inputWrapper}>
                                    <input name='prenom' value={formData.prenom} onChange={handleChange} type="text" placeholder="Choaib" required />
                                    <User className={style.inputIcon} size={16} />
                                </div>
                            </div>
                            <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                                <label>Nom</label>
                                <div className={style.inputWrapper}>
                                    <input name='nom' value={formData.nom} onChange={handleChange} type="text" placeholder="Bouaaliouat" required />
                                    <Hash className={style.inputIcon} size={16} />
                                </div>
                            </div>
                        </div>

                        <div className={style.inputRow} style={{ marginBottom: '15px', gap: '15px' }}>
                            <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                                <label>Téléphone</label>
                                <div className={style.inputWrapper}>
                                    <input name="telephone" value={formData.telephone} onChange={handleChange} type="tel" placeholder="+212 6..." required />
                                    <Phone className={style.inputIcon} size={16} />
                                </div>
                            </div>
                            <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                                <label>Nom du Club / Association</label>
                                <div className={style.inputWrapper}>
                                    <input name="nomClub" value={formData.nomClub} onChange={handleChange} type="text" placeholder="Ex: Club Informatique" required />
                                    <Building className={style.inputIcon} size={18} strokeWidth={2.5} />
                                </div>
                            </div>
                        </div>

                        <div className={style.inputGroup} style={{ marginBottom: '15px' }}>
                            <label>Adresse Email</label>
                            <div className={style.inputWrapper}>
                                <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="exemple@gmail.com" required />
                                <Mail className={style.inputIcon} size={18} strokeWidth={2.5} />
                            </div>
                        </div>

                        <div className={style.inputGroup} style={{ marginBottom: '15px' }}>
                            <label>Justificatif (Attestation/CV/...)</label>
                            <div className={style.inputWrapper}>
                                <input type="file" style={{ paddingLeft: '50px' }} />
                                <FileText className={style.inputIcon} size={18} strokeWidth={2.5} />
                            </div>
                        </div>

                        <div className={style.inputGroup} style={{ marginBottom: '20px' }}>
                            <label>Mot de passe</label>
                            <div className={style.inputWrapper}>
                                <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="*******" required />
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
                        <NavLink to="/auth/login"> Se Connecter</NavLink>
                    </div>
                </div>

            </div>
        </div>
    );
}