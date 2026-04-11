import style from './Home.module.css'
import Bg_img from '../../assets/Masters_et_Masters_Spécialisés_à_la_FP_Taroudant_2020-2021-removebg-preview.png';
import { FaHome, FaCalendarAlt, FaUser, FaBell } from 'react-icons/fa';

export default function Main(){
    return(
        <div className={style.container}>
            
                <nav className={style.interface_bar}>
                    <nav className={style.logo}>
                        <img src={Bg_img} alt="dashbord logo"  width={'100px'}/>
                        <p>EventFPT</p>
                    </nav>
                    
                   <hr />
                   <nav className={style.list_items}>
                         <ul >
                            <li> <FaHome size={20}/><span> Home </span> </li>
                            <li><FaCalendarAlt size={20}/> <span> My Events </span></li>
                            <li><FaUser size={20}/> <span> Profile</span></li>
                            <li> <FaBell size={20}/><span> Notification </span></li>
                         </ul>
                    <nav className={style.profile}>
                        <hr   />
                        <section className={style.contentPro}>
                        
                         <img src={Bg_img} alt="" width={'40px'} className={style.proImg} />
                       
                         <div className={style.infoPro}>
                            <h1>Name prename</h1>
                            <p>student ID :111111</p>
                         </div>
                          </section>
                     </nav>      
                   </nav>
                </nav>
                <nav className={style.content_space}>
                       <h1>
                        hello
                       </h1>
                </nav>
        
        </div>
    )
}