import style from './Home.module.css'
import Bg_img from '../signin&signup/zzzzz-removebg-preview.png'
export default function Main(){
    return(
        <div className={style.container}>
            <div>
                <nav className={style.interface_bar}>
                    <nav className={style.logo}>
                        <img src={Bg_img} alt="dashbord logo"  width={'100px'}/>
                        <p>EventConnect</p>
                    </nav>
                   <hr />
                </nav>
            </div>
        </div>
    )
}