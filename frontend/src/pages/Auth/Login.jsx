import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';// pour les icons 
import Icon_image from "../../assets/Masters_et_Masters_Spécialisés_à_la_FP_Taroudant_2020-2021-removebg-preview.png";
import style from './style.module.css';
import axios from 'axios';
export default function Login() {
    const Navigate = useNavigate();
   
   


    const handform =async(e)=>{
        e.preventDefault(); 
        try{

            const formData = new  FormData(e.target)
            const data = Object.fromEntries(formData.entries())
          const res =await axios.post('http://localhost:5000/api/signin',data)
          console.log("Connexion réussie ✅", res.data);
        
        
        if (data.role === 'student') Navigate('/app/Home');
        else if (data.role === 'organizer') Navigate('/organisateur');
        else if (data.role === 'administration') Navigate('/responsable');


        }catch(err){
             console.log("Erreur de connexion ❌", err.response?.data || err.message);
             alert(err.response?.data?.message || "Email ou mot de passe incorrect");
        }
          
           
    }


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

                    <form  onSubmit={handform}>
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

                        

                        <button type="submit" className={style.submitBtn} >
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