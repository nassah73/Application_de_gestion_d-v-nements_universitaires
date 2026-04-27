import { LayoutDashboard, CalendarCheck, Users, Tag,Bell,Settings,LogOut} from 'lucide-react'
import { useNavigate } from 'react-router-dom';
export default function Sidebare(){
    const NavItem = ({ icon, label, path, active = false }) => { 
        const navigate = useNavigate();
         return ( 
         <div onClick={() => path && navigate(path)} 
         className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all" 
         style={active ? { background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700 } : { color: 'rgba(255,255,255,0.75)' }}
          onMouseEnter={e => !active && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')} 
          onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent')}> {icon} 
          <span className="text-sm">{label}</span> </div> ); };
    return(
      <aside className="w-64 flex flex-col shrink-0" style={{ background: 'linear-gradient(145deg,rgba(205,115,41,0.95),rgba(168,85,20,0.9))' }}>
              <div className="p-6 border-b border-white/10">
                <h1 className="text-xl font-black uppercase tracking-wider text-white">UIZ University</h1>
                <p className="text-xs text-white/60 mt-1">Administration</p>
              </div>
              <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
                <NavItem path="/responsable"               icon={<LayoutDashboard size={20}/>} label="Dashboard"        />
                <NavItem path="/responsable/events"        icon={<CalendarCheck   size={20}/>} label="Event Validation" active />
                <NavItem path="/responsable/users"         icon={<Users           size={20}/>} label="User Management"  />
                <NavItem path="/responsable/notifications" icon={<Bell            size={20}/>} label="Notifications"    />
                <NavItem path="/responsable/categories"    icon={<Tag             size={20}/>} label="Categories"       />
              </nav>
              <div className="mt-auto p-4 border-t border-white/10 space-y-1 shrink-0">
                <NavItem path="/responsable/settings" icon={<Settings size={20}/>} label="Settings" />
                <NavItem path="/auth/login"           icon={<LogOut   size={20}/>} label="Logout"   />
              </div>
            </aside>
    )
 
}