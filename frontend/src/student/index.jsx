import style from './Home.module.css'
import Bg_img from '../signin&signup/zzzzz-removebg-preview.png'
export default function Main(){
    return(
        <div className={style.container}>
            <div>
                <nav className={style.interface_bar}>
                    <nav className={style.logo}>
                        <img src={Bg_img} alt="dashbord logo"  width={'100px'}/>
                        <p>EventFPT</p>
                    </nav>
                    
                   <hr />
                   <nav className={style.list_items}>
                         <ul >
                            <li>Home</li>
                            <li>My Events</li>
                            <li>Profile</li>
                            <li>Notification</li>
                         </ul>
                    <nav className={style.profile}>
                        <hr />
                         <img src={Bg_img} alt="" width={'20px'} className={style.proImg} />
                         <div className={style.infoPro}>
                            <h1>Name prename</h1>
                            <p>student ID :111111</p>
                         </div>
                     </nav>      
                   </nav>
                </nav>
            </div>
        </div>
    )
}