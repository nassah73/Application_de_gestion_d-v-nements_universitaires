import React from 'react';
import { User, Mail, Calendar, CheckCircle2, Clock, Search } from 'lucide-react';

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
      <div className="text-center py-20 rounded-2xl border border-dashed border-white/10" 
        style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <User size={32} className="text-white/20" />
        </div>
        <p className="text-white/40 font-medium">Aucun participant inscrit pour le moment</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full border-collapse">
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
              <th className="px-6 py-4 text-left text-xs font-black text-white/40 uppercase tracking-widest border-b border-white/5">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-orange-500" />
                  Participant
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-black text-white/40 uppercase tracking-widest border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-orange-500" />
                  Email
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-black text-white/40 uppercase tracking-widest border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-orange-500" />
                  Inscription
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-black text-white/40 uppercase tracking-widest border-b border-white/5">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {participants.map((participant, index) => {
              const student = participant.student || {};
              const isPresent = participant.status === 'present';
              
              return (
                <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center border border-orange-500/20 group-hover:scale-110 transition-transform">
                        <span className="text-orange-500 font-black text-sm uppercase">
                          {student.firstName?.charAt(0) || '?'}{student.lastName?.charAt(0) || ''}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-white uppercase tracking-tight">
                          {student.firstName && student.lastName 
                            ? `${student.firstName} ${student.lastName}` 
                            : 'Non spécifié'}
                        </div>
                        <div className="text-xs text-white/30 font-medium">
                          {student.studentCardNumber || 'No Card ID'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white/60 font-medium flex items-center gap-2">
                      {student.email || 'Non spécifié'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/40 font-medium">
                    {participant.registeredAt ? formatDate(participant.registeredAt) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                      isPresent 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}>
                      {isPresent ? (
                        <>
                          <CheckCircle2 size={12} />
                          Présent
                        </>
                      ) : (
                        <>
                          <Clock size={12} />
                          En attente
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipantsTable;