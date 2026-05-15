const API_URL = 'http://localhost:5000/Event';

export const eventService = {
    // Récupérer les événements de l'organisateur
    getMyEvents: async (organizerId) => {
        const response = await fetch(`${API_URL}/organizer/${organizerId}`);
        if (!response.ok) throw new Error('Erreur lors de la recuperation des evenements');
        return response.json();
    },

    // Récupérer les détails d'un événement
    getEventById: async (eventId) => {
        const response = await fetch(`${API_URL}/${eventId}`);
        if (!response.ok) throw new Error('Erreur lors de la recuperation des details');
        return response.json();
    },

    // Marquer la présence d'un étudiant
    markAttendance: async (eventId, studentId) => {
        const response = await fetch(`${API_URL}/mark-attendance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId, studentId })
        });
        if (!response.ok) throw new Error('Erreur lors de la validation de la presence');
        return response.json();
    },

    // Mettre à jour un événement
    updateEvent: async (eventId, eventData) => {
        const response = await fetch(`${API_URL}/${eventId}`, {
            method: 'PUT',
            body: eventData // eventData sera un FormData pour gérer l'image
        });
        if (!response.ok) throw new Error('Erreur lors de la modification de l\'événement');
        return response.json();
    },

    // Supprimer un événement
    deleteEvent: async (eventId) => {
        const response = await fetch(`${API_URL}/${eventId}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Erreur lors de la suppression de l\'événement');
        return response.json();
    }
};

export default eventService;
