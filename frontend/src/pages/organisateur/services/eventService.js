const API_URL = 'http://localhost:5000/api/events';

export const eventService = {
    // Récupérer les événements de l'organisateur
    getMyEvents: async (organizerId) => {
        const response = await fetch(`${API_URL}/events/organizer/${organizerId}`);
        if (!response.ok) throw new Error('Erreur lors de la recuperation des evenements');
        return response.json();
    },

    // Récupérer les détails d'un événement
    getEventById: async (eventId) => {
        const response = await fetch(`${API_URL}/events/${eventId}`);
        if (!response.ok) throw new Error('Erreur lors de la recuperation des details');
        return response.json();
    },

    // Marquer la présence d'un étudiant
    markAttendance: async (eventId, studentId) => {
        const response = await fetch(`${API_URL}/events/mark-attendance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId, studentId })
        });
        if (!response.ok) throw new Error('Erreur lors de la validation de la presence');
        return response.json();
    }
};

export default eventService;
