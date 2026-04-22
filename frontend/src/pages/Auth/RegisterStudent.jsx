import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Mail, BookOpen, Lock, UserPlus, Phone, Hash, GraduationCap, Calendar } from 'lucide-react';
import Icon_image from "../../assets/Masters_et_Masters_Spécialisés_à_la_FP_Taroudant_2020-2021-removebg-preview.png";
import style from './style.module.css';

export default function RegisterStudent() {
    const handelForm=(formData)=>{
       const FullName =formData.get('FullName')
       const CNE=formData.get('CNE')
       const Email=formData.get('Email')
       const telephone= formData.get('tel')
       const filier=formData.get('filier')
       const nevaux=formData.get('Niveau')
       const password=formData.get('password')
       console.log(FullName + ' / '+CNE+' / '+Email +' / '+nevaux + ' / '+password+' / '+filier)
    }
    return (
      <div className={style.content}>
        <div className={style.container} >
            
            <div className={style.bgLogin}>
                <img src={Icon_image} alt="Logo" />
                <h2>Espace Étudiant</h2>
                <p>Rejoignez la plateforme et accédez à tous les événements de l'université en un clic.</p>
            </div>

            <div className={style.formSection} style={{ padding: '20px 60px', width: '55%' }}>
                <h1>Inscription</h1>
                <p className={style.subtitle} style={{ marginBottom: '15px' }}>Créez votre compte étudiant</p>

                <form action={handelForm}>
                   
                    <div className={style.inputRow} style={{ marginBottom: '12px', gap: '15px' }}>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Nom et Prénom</label>
                            <div className={style.inputWrapper}>
                                <input name='FullName' type="text" placeholder="Ahmed Karim" required />
                                <User className={style.inputIcon} size={16} />
                            </div>
                        </div>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>CNE</label>
                            <div className={style.inputWrapper}>
                                <input name='CNE' type="text" placeholder="D123456789" required />
                                <Hash className={style.inputIcon} size={16} />
                            </div>
                        </div>
                    </div>

                    
                    <div className={style.inputRow} style={{ marginBottom: '12px', gap: '15px' }}>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Email</label>
                            <div className={style.inputWrapper}>
                                <input name='Email' type="email" placeholder="hassan@edu.uiz.ac.ma" required />
                                <Mail className={style.inputIcon} size={16} />
                            </div>
                        </div>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Téléphone</label>
                            <div className={style.inputWrapper}>
                                <input name="tel" type="tel" placeholder="+212 6..." required />
                                <Phone className={style.inputIcon} size={16} />
                            </div>
                        </div>
                    </div>

                    
                    <div className={style.inputRow} style={{ marginBottom: '12px', gap: '15px' }}>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Filière</label>
                            <div className={style.inputWrapper}>
                                <select required defaultValue="" name='filier'>
                                    <option value="" disabled>Filière</option>
                                    <option value="SMI">SMI</option>
                                    <option value="SMA">SMA</option>
                                    <option value="SEG">SEG</option>
                                </select> 
                                <BookOpen className={style.inputIcon} size={16} />
                            </div>
                        </div>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Niveau</label>
                            <div className={style.inputWrapper}>
                                <select required defaultValue="" name='Niveau'>
                                    <option value="" disabled>Niveau</option>
                                    <option value="1ère Année">1ère Année</option>
                                    <option value="2ème Année">2ème Année</option>
                                    <option value="3ème Année">3ème Année</option>
                                </select> 
                                <GraduationCap className={style.inputIcon} size={16} />
                            </div>
                        </div>
                    </div>

                    
                    <div className={style.inputRow} style={{ marginBottom: '12px', gap: '15px' }}>
                        
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Mot de passe</label>
                            <div className={style.inputWrapper}>
                                <input name='password' type="password" placeholder="********" required />
                                <Lock className={style.inputIcon} size={16} />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className={style.submitBtn} style={{ marginTop: '10px' }}>
                        Créer mon compte <UserPlus size={20} strokeWidth={2.5} />
                    </button>
                </form>

                <div className={style.formFooter} style={{ marginTop: '7px', fontSize: '0.9rem' }}>
                    S'inscrire en tant qu'<NavLink to="/register-organisateur">Organisateur</NavLink>
                    <span style={{ margin: '0 10px' }}>|</span>
                    <NavLink to="/login">Se Connecter</NavLink>
                </div>
            </div>

        </div>
      </div> 
    );
}