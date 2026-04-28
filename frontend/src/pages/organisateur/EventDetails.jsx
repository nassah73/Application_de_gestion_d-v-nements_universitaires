import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrgSidebar from './components/OrgSidebar';
import OrgNavbar from './components/OrgNavbar';
import ParticipantsTable from './components/ParticipantsTable';
import eventService from './services/eventService';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const data = await eventService.getEventById(id);
        setEvent(data);
      } catch (err) {
        setError('Erreur lors de la recuperation des details de l\'evenement');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':          return 'bg-green-100 text-green-700';
      case 'approved-modified': return 'bg-indigo-100 text-indigo-700';
      case 'pending':           return 'bg-yellow-100 text-yellow-700';
      case 'rejected':          return 'bg-red-100 text-red-700';
      default:                  return 'bg-gray-100 text-gray-700';
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

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <OrgSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <OrgNavbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Chargement des details...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex h-screen bg-gray-100">
        <OrgSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <OrgNavbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
              <p className="text-red-700">{error || 'Evenement non trouve'}</p>
              <Link 
                to="/organisateur/events" 
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                Retour aux evenements
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Déterminer si l'événement est "publié" (validé) → afficher participants
  const isPublished = event.status === 'approved' || event.status === 'approved-modified';
  const isRejected = event.status === 'rejected';
  const isPending = event.status === 'pending';

  const inscriptionCount = event.participants?.length || 0;
  const fillRate = event.capacity > 0 ? (inscriptionCount / event.capacity) * 100 : 0;

  // Afficher le titre modifié si présent (approved-modified)
  const displayTitle = event.modifiedTitle || event.title;
  const displayDescription = event.modifiedDescription || event.description;
  const displayDate = event.modifiedDate || event.date;
  const displayLocation = event.modifiedLocation || event.location;
  const displayCategory = event.modifiedCategory || event.category;
  const displayRegistrationLink = event.modifiedRegistrationLink || event.registrationLink;

  return (
    <div className="flex h-screen bg-gray-100">
      <OrgSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <OrgNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {/* Bouton retour */}
          <Link 
            to="/organisateur/events" 
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <span className="mr-2">←</span> Retour aux evenements
          </Link>

          <div className="space-y-6">
            {/* ============================================================ */}
            {/* 1. ALERTE — Événement rejeté                                 */}
            {/* ============================================================ */}
            {isRejected && (
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h3 className="text-red-800 font-bold text-lg">Événement refusé</h3>
                    <p className="text-red-700 mt-1">
                      <strong>Motif du refus :</strong>{' '}
                      {event.rejectionReason || 'Aucun motif spécifique fourni par l\'administration.'}
                    </p>
                    <p className="text-red-500 text-sm mt-2">
                      Vous ne pouvez pas modifier cet événement. Veuillez créer un nouvel événement en tenant compte des motifs ci-dessus.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* 1b. ALERTE — Événement validé avec modification              */}
            {/* ============================================================ */}
            {event.status === 'approved-modified' && (
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔄</span>
                  <div>
                    <h3 className="text-indigo-800 font-bold text-lg">
                      Événement mis à jour
                    </h3>
                    <p className="text-indigo-700 mt-1 text-sm">
                      Les informations ci-dessous reflètent les modifications approuvées par l'administration.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* 2. CARTE D'INFORMATIONS PRINCIPALES                           */}
            {/* ============================================================ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Info principale */}
              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{displayTitle}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(event.status)}`}>
                    {getStatusLabel(event.status)}
                  </span>
                </div>
                
                {event.coverImage && (
                  <div className="h-48 -mx-6 -mt-2 mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={`http://localhost:5000/${event.coverImage}`} 
                      alt={displayTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <p className="text-gray-600 mb-4">{displayDescription}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    <strong>Lieu :</strong>
                    <span className="ml-2">{displayLocation}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📅</span>
                    <strong>Date :</strong>
                    <span className="ml-2">{formatDate(displayDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🏷️</span>
                    <strong>Catégorie :</strong>
                    <span className="ml-2">{displayCategory}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🔗</span>
                    <strong>Lien :</strong>
                    <a 
                      href={displayRegistrationLink}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      {displayRegistrationLink ? 'Ouvrir' : 'Non spécifié'}
                    </a>
                  </div>
                </div>

                {/* Légende "modifié" si approved-modified */}
                {event.status === 'approved-modified' && (
                  <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-indigo-500 italic">
                    Les informations affichées incluent les modifications approuvées par l'administration.
                    {event.originalTitle && event.originalTitle !== displayTitle && (
                      <p className="mt-1">Ancien titre : <span className="line-through text-gray-400">{event.originalTitle}</span></p>
                    )}
                  </div>
                )}
              </div>

              {/* Carte statistiques / infos statut */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                {isRejected ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <span className="text-5xl mb-3">🚫</span>
                    <p className="text-red-600 font-bold text-lg">Refusé</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {event.rejectionReason || 'Motif non spécifié'}
                    </p>
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <span className="text-5xl mb-3">⏳</span>
                    <p className="text-yellow-600 font-bold text-lg">En cours</p>
                    <p className="text-gray-400 text-sm mt-2">
                      L'événement est en attente de validation par l'administration.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-500 text-sm mb-2">Taux de remplissage</p>
                    <div className="text-4xl font-bold text-blue-600">
                      {inscriptionCount} / {event.capacity}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Étudiants inscrits</p>
                    
                    {/* Barre de progression */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                      <div 
                        className={`h-3 rounded-full transition-all ${fillRate >= 90 ? 'bg-red-500' : fillRate >= 70 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(fillRate, 100)}%` }}
                      ></div>
                    </div>
                    {fillRate >= 90 && (
                      <span className="mt-2 inline-block px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        Presque plein
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* ============================================================ */}
            {/* 3. SECTION PARTICIPANTS                                       */}
            {/* ============================================================ */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-700">
                  Liste des Participants
                  {isPublished && inscriptionCount > 0 && (
                    <span className="ml-2 text-gray-400 font-normal">({inscriptionCount})</span>
                  )}
                </h3>
                {isPublished && inscriptionCount > 0 && (
                  <button className="bg-gray-800 text-white text-sm px-4 py-2 rounded flex items-center hover:bg-black transition">
                    <span className="mr-2">📥</span> Exporter PDF
                  </button>
                )}
              </div>
              
              <div className="p-4">
                {isPublished ? (
                  inscriptionCount > 0 ? (
                    <ParticipantsTable 
                      eventId={id} 
                      participants={event.participants} 
                    />
                  ) : (
                    <div className="text-center py-10 text-gray-400">
                      <div className="text-4xl mb-2">📋</div>
                      <p>Aucun participant inscrit pour le moment.</p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-10 text-gray-400 italic">
                    {isRejected
                      ? "Participants non disponibles — événement refusé."
                      : "La liste des participants sera disponible une fois l'événement validé par l'administration."
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventDetails;
