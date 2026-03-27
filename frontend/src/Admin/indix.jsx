import style from "./style.module.css"
import logoimg from '../signin&signup/Masters_et_Masters_Spécialisés_à_la_FP_Taroudant_2020-2021-removebg-preview.png'
import Objet from './objet'
import { 
  FaChartLine, 
  FaUsers, 
  FaFolderOpen, 
  FaUserCheck, 
  FaFileShield 
} from 'react-icons/fa6';
export default function(){
    return(
        
        <div className={style.container}>
             <nav className={style.navBar}>
                  <section className={style.logo}>
                       <img src={logoimg} alt="logo"  width={'100px'}  />
                       <p>EventFPT</p>
                       
                  </section>
                  <hr/>
                  <section className={style.items}>
                      <ul className={style.list}>
                         <li><FaChartLine size={'18px'}/> <span>Global Statistics</span> </li>
                         <li><FaUsers size={'18px'}/> <span>User Management</span> </li>
                         <li><FaFolderOpen size={'18px'}/> <span>Category Management</span> </li>
                         <li><FaUserCheck size={'18px'}/> <span>Organizer Approval</span> </li>
                          <li><FaFileShield size={'18px'}/> <span>Content Moderation</span> </li>
                      </ul>
                  </section>
                  <section className={style.compt}>
                    <hr />
                    <div className={style.ProInfo}>
                         <img src={logoimg} alt="" width={'80px'}/>
                            <Info {...Objet}
                            />
                    </div>
                  </section>
             </nav>
        </div>
        
    )
}
function Info(props){
     return(
          <nav className={style.contentInfo}>
                                 <h1>{props.prename} {props.name}</h1>
                                 <p>student ID :{props.Id}</p>
                            </nav>
     )
}
