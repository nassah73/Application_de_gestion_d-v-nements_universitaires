import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, Clock, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';

const EventCard = ({ event }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved':
      case 'Validé':
        return {
          label: 'Validé',
          icon: <CheckCircle2 size={12} />,
          style: 'bg-green-500/10 text-green-400 border-green-500/20'
        };
      case 'pending':
      case 'En cours':
        return {
          label: 'En attente',
          icon: <Clock size={12} />,
          style: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
        };
      case 'rejected':
      case 'Rejeté':
        return {
          label: 'Rejeté',
          icon: <XCircle size={12} />,
          style: 'bg-red-500/10 text-red-400 border-red-500/20'
        };
      case 'approved-modified':
        return {
          label: 'Modifié',
          icon: <RotateCcw size={12} />,
          style: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        };
      default:
        return {
          label: status,
          icon: <Clock size={12} />,
          style: 'bg-white/5 text-white/40 border-white/10'
        };
    }
  };

  const statusConfig = getStatusConfig(event.status);
  const title = event.titre || event.title;
  const location = event.lieu || event.location;
  const date = event.date;
  const id = event._id || event.id;
  

  return (
    <div className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden hover:bg-white/[0.05] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:scale-[1.02]">
      {/* Event Image */}
      <div className="h-40 bg-gradient-to-br from-orange-500/20 to-orange-600/5 relative overflow-hidden">
        {event.coverImage ? (
          <img 
            src={`http://localhost:5000/${event.coverImage}`} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar size={40} className="text-white/10" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${statusConfig.style}`}>
            {statusConfig.icon}
            {statusConfig.label}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-black text-white uppercase tracking-tight line-clamp-1 group-hover:text-orange-500 transition-colors">
            {title}
          </h3>
          <p className="text-white/40 text-xs mt-2 line-clamp-2 leading-relaxed">
            {event.description || "Aucune description disponible pour cet événement."}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-white/60 text-[11px] font-medium uppercase tracking-wider">
            <Calendar size={14} className="text-orange-500" />
            {date ? new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Date non spécifiée'}
          </div>
          <div className="flex items-center gap-2 text-white/60 text-[11px] font-medium uppercase tracking-wider">
            <MapPin size={14} className="text-orange-500" />
            {location || 'Lieu non spécifié'}
          </div>
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-white/5">
          <Link 
            to={`/organisateur/events/${id}`} 
            className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-widest hover:text-orange-500 transition-colors"
          >
            Détails
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">
            #{id?.toString().slice(-6)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;