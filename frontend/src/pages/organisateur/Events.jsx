import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrgSidebar from './components/OrgSidebar';
import OrgNavbar from './components/OrgNavbar';
import eventService from './services/eventService';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const organizerId = user._id || user.id;
        
        if (!organizerId) {
          setError('Organisateur non identifié');
          setLoading(false);
          return;
        }

        const data = await eventService.getMyEvents(organizerId);
        setEvents(data);
      } catch (err) {
        setError('Erreur lors de la recuperation des evenements');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':          return 'bg-green-100 text-green-800';
      case 'approved-modified': return 'bg-blue-100 text-blue-800';
      case 'pending':           return 'bg-yellow-100 text-yellow-800';
      case 'rejected':          return 'bg-red-100 text-red-800';
      default:                  return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved':          return 'Validé';
      case 'approved-modified': return 'Validé avec modification';
      case 'pending':           return 'En cours';
      case 'rejected':          return 'Refusé';
      default:                  return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <OrgSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <OrgNavbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Chargement des evenements...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <OrgSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <OrgNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Mes Événements</h2>
            <Link 
              to="/organisateur/create-event" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <span>+</span> Créer un événement
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {events.length === 0 && !error ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun événement créé</h3>
              <p className="text-gray-500 mb-6">Commencez par créer votre premier événement.</p>
              <Link 
                to="/organisateur/create-event" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
              >
                Créer un événement
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event._id} className="bg-white p-5 rounded-lg shadow border border-gray-200 hover:shadow-md transition">
                  {/* En-tête avec image de couverture */}
                  {event.coverImage && (
                    <div className="h-32 -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-lg">
                      <img 
                        src={`http://localhost:5000/${event.coverImage}`} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusStyle(event.status)}`}>
                      {getStatusLabel(event.status)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{event.description}</p>
                  
                  <div className="text-xs text-gray-400 space-y-1 mb-4">
                    <p>📍 {event.location}</p>
                    <p>📅 {formatDate(event.date)}</p>
                    <p>👥 {event.participants?.length || 0} / {event.capacity} participants</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                    {/* Bouton Détails — toujours présent */}
                    <Link 
                      to={`/organisateur/events/${event._id}`} 
                      className="flex-1 text-center text-sm bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                      Détails
                    </Link>

                    {/* Bouton Modifier — conditionnel */}
                    {event.status === 'pending' && (
                      <Link
                        to={`/organisateur/editer-evenement?id=${event._id}`}
                        className="flex-1 text-center text-sm bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition"
                      >
                        Modifier
                      </Link>
                    )}
                    {(event.status === 'approved' || event.status === 'approved-modified') && (
                      <Link
                        to={`/organisateur/editer-evenement?id=${event._id}`}
                        className="flex-1 text-center text-sm bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
                      >
                        Demander modification
                      </Link>
                    )}
                    {event.status === 'rejected' && (
                      <button
                        className="flex-1 text-sm bg-gray-300 text-gray-600 py-2 rounded cursor-not-allowed"
                        disabled
                      >
                        Bloqué
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Events;
