import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import { User, Mail, BookOpen, Lock, UserPlus, Phone, Hash, GraduationCap, Camera } from 'lucide-react';
import Icon_image from "../../assets/Masters_et_Masters_Spécialisés_à_la_FP_Taroudant_2020-2021-removebg-preview.png";
import style from './style.module.css';
import axios from 'axios';

export default function RegisterStudent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        cne: '',
        email: '',
        phone: '',
        filiere: '',
        niveau: '',
        password: ''
    });
    const [profileImage, setProfileImage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation: Email académique
        if (!formData.email.endsWith('@edu.uiz.ac.ma')) {
            alert("Veuillez utiliser votre email académique (@edu.uiz.ac.ma)");
            return;
        }

        // Validation: CNE (1 lettre + 9 chiffres)
        const cneRegex = /^[A-Z]\d{9}$/i;
        if (!cneRegex.test(formData.cne)) {
            alert("Format CNE invalide (Ex: D123456789). Il doit commencer par une lettre suivie de 9 chiffres.");
            return;
        }

        console.log('=== Register Student Submitted ===');
        
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        if (profileImage) {
            data.append('profileImage', profileImage);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/students/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
            alert(response.data.message);
            navigate('/auth/login');
        } catch (error) {
            console.error('Error registering student:', error);
            console.error('Error response:', error.response);
            alert(error.response?.data?.message || error.message || 'Erreur lors de l\'enregistrement');
        }
    };

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
                <form onSubmit={handleSubmit}>
                   
                    <div className={style.inputRow} style={{ marginBottom: '12px', gap: '15px' }}>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Nom et Prénom</label>
                            <div className={style.inputWrapper}>
                                {/* بدلت name لـ fullName باش يطابق الـ Schema */}
                                <input name='fullName' value={formData.fullName} onChange={handleChange} type="text" placeholder="Ahmed Karim" required />
                                <User className={style.inputIcon} size={16} />
                            </div>
                        </div>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>CNE</label>
                            <div className={style.inputWrapper}>
                                <input name='cne' value={formData.cne} onChange={handleChange} type="text" placeholder="D123456789" required />
                                <Hash className={style.inputIcon} size={16} />
                            </div>
                        </div>
                    </div>

                    <div className={style.inputRow} style={{ marginBottom: '12px', gap: '15px' }}>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Email</label>
                            <div className={style.inputWrapper}>
                                
                                <input name='email' value={formData.email} onChange={handleChange} type="email" placeholder="hassan@edu.uiz.ac.ma" required />
                                <Mail className={style.inputIcon} size={16} />
                            </div>
                        </div>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Téléphone</label>
                            <div className={style.inputWrapper}>
                                
                                <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+212 6..." required />
                                <Phone className={style.inputIcon} size={16} />
                            </div>
                        </div>
                    </div>

                    <div className={style.inputRow} style={{ marginBottom: '12px', gap: '15px' }}>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Filière</label>
                            <div className={style.inputWrapper}>
                                
                                <select required name='filiere' value={formData.filiere} onChange={handleChange}>
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
                                
                                <select required name='niveau' value={formData.niveau} onChange={handleChange}>
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
                            <label>Photo de Profil</label>
                            <div className={style.inputWrapper}>
                                <input name='profileImage' onChange={handleFileChange} type="file" accept="image/*" />
                                <Camera className={style.inputIcon} size={16} />
                            </div>
                        </div>
                        <div className={style.inputGroup} style={{ marginBottom: '0' }}>
                            <label>Mot de passe</label>
                            <div className={style.inputWrapper}>
                                <input name='password' value={formData.password} onChange={handleChange} type="password" placeholder="********" required />
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