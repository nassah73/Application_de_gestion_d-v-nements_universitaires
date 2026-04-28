import React from 'react';

const ParticipantsTable = ({ participants = [] }) => {
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!participants || participants.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>Aucun participant inscrit</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-3">Nom Complet</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Date d'inscription</th>
            <th className="px-6 py-3">Statut Presence</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {participants.map((participant, index) => {
            const student = participant.student || {};
            return (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold text-sm">
                        {student.firstName?.charAt(0) || '?'}{student.lastName?.charAt(0) || ''}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {student.firstName && student.lastName 
                        ? `${student.firstName} ${student.lastName}` 
                        : 'Non specifie'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {student.email || 'Non specifie'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {participant.registeredAt ? formatDate(participant.registeredAt) : '-'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    participant.status === 'present' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {participant.status === 'present' ? 'Present' : 'En attente'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantsTable;