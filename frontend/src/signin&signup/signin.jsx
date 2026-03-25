import Icon_image from "./zzzzz-removebg-preview.png";
import style from './style.module.css';
import { useState } from "react";

export default function Login() {
    const [issignup, setsignup] = useState(false);

    return (
      <div className={style.content}>
        <div className={style.container}>
        
            <div className={style.signup}>
                <form action="">
                    <h1>sign up</h1>
                    <input type="email" placeholder="email" name="email" />
                    <input type="password" placeholder="password" name="email" />
                    <input type="password" placeholder="conferm password" name="conferm_password" />
                    
                    <div className={style.Radio}>
                        <label>
                            <input type="radio" name="role" value="student" />
                            <span> student</span>
                        </label>
                        <label>
                            <input type="radio" name="role" value="teacher" />
                            <span> teacher </span>
                        </label>
                        <label>
                            <input type="radio" name="role" value="admin" />
                            <span>admine</span>
                        </label>
                    </div>
                    <button>sign up</button>
                </form>
            </div>


            <div className={`${style['bg-login']} ${issignup ? style.slide : style.inslide}`}>
                <nav>
                    <img src={Icon_image} alt="event icons" width={"200px"} />
                </nav>
                <button 
                    className={style['bt-signup']} 
                    onClick={() => { setsignup(!issignup) }}
                >
                    {`sign ${issignup ? "in" : "up"}`}
                </button>
            </div>

           
            <div className={`${style.signin} ${issignup ? style.invesible : style.vesible}`}>
                <form action="">
                    <h1>sign in</h1>
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" id="email" />

                    <label htmlFor="password">password</label>
                    <input type="password" name="password" id="password" />
                    <button className={style.signin}>sign in</button>
                </form>
            </div>
        </div>
       </div> 
    );
}