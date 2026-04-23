import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Mail, BookOpen, Lock, UserPlus, Phone, Hash, GraduationCap } from 'lucide-react';
import Icon_image from "../../assets/Masters_et_Masters_Spécialisés_à_la_FP_Taroudant_2020-2021-removebg-preview.png";
import style from './style.module.css';
import axios from 'axios';

export default function RegisterStudent() {
     
    const handelForm = async (e) => {
        e.preventDefault(); 
        
        const formData = new FormData(e.target); 
        const data = Object.fromEntries(formData.entries());
        
        console.log("Data being sent:", data); 

        try {
          
            const reponse = await axios.post('http://localhost:5000/api/register', data);
            console.log('Response:', reponse.data);
            alert("Success! 🎉 Student registered.");
        } catch (err) {
            console.error('Error detail:', err.response?.data || err.message);
            alert("Error sending data ❌: " + (err.response?.data?.error || "Check console"));
        }
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

                {/* استعملنا onSubmit باش نتحكمو فـ Axios */}
                <form onSubmit={handelForm}>
                   
                    <div className={style.inputRow} style={{ marginBottom: '12px', gap: '15px' }}>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Nom et Prénom</label>
                            <div className={style.inputWrapper}>
                                {/* بدلت name لـ fullName باش يطابق الـ Schema */}
                                <input name='fullName' type="text" placeholder="Ahmed Karim" required />
                                <User className={style.inputIcon} size={16} />
                            </div>
                        </div>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>CNE</label>
                            <div className={style.inputWrapper}>
                                {/* بدلت name لـ cne */}
                                <input name='cne' type="text" placeholder="D123456789" required />
                                <Hash className={style.inputIcon} size={16} />
                            </div>
                        </div>
                    </div>

                    <div className={style.inputRow} style={{ marginBottom: '12px', gap: '15px' }}>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Email</label>
                            <div className={style.inputWrapper}>
                                {/* بدلت name لـ email */}
                                <input name='email' type="email" placeholder="hassan@edu.uiz.ac.ma" required />
                                <Mail className={style.inputIcon} size={16} />
                            </div>
                        </div>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Téléphone</label>
                            <div className={style.inputWrapper}>
                                {/* بدلت name لـ tel باش يطابق الـ Model */}
                                <input name="tel" type="tel" placeholder="+212 6..." required />
                                <Phone className={style.inputIcon} size={16} />
                            </div>
                        </div>
                    </div>

                    <div className={style.inputRow} style={{ marginBottom: '12px', gap: '15px' }}>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Filière</label>
                            <div className={style.inputWrapper}>
                                {/* بدلت name لـ filiere */}
                                <select required defaultValue="" name='filiere'>
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
                                {/* بدلت name لـ niveau */}
                                <select required defaultValue="" name='niveau'>
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