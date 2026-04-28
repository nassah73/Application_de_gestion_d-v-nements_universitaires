import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const statusColors = {
    Validé: 'bg-green-100 text-green-700',
    'En cours': 'bg-blue-100 text-blue-700',
    Rejeté: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-bold px-2 py-1 rounded ${statusColors[event.status]}`}>
          {event.status}
        </span>
      </div>
      <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">{event.title}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{event.description}</p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <Link 
          to={`/organisateur/events/${event.id}`} 
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          Voir détails
        </Link>
        <span className="text-xs text-gray-400">ID: #{event.id}</span>
      </div>
    </div>
  );
};

export default EventCard;