import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    'Soumis':   { background: 'rgba(59,130,246,0.12)', color: '#2563EB' },
    'Validé':   { background: 'rgba(16,185,129,0.12)', color: '#059669' },
    'approved': { background: 'rgba(16,185,129,0.12)', color: '#059669' },
    'Publié':   { background: 'rgba(6,182,212,0.12)', color: '#0891B2' },
    'Rejeté':   { background: 'rgba(239,68,68,0.12)', color: '#DC2626' },
    'rejected': { background: 'rgba(239,68,68,0.12)', color: '#DC2626' },
    'Brouillon': { background: 'rgba(100,116,139,0.12)', color: '#475569' },
    'pending':   { background: 'rgba(251,191,36,0.12)', color: '#D97706' },
    'modification_requested': { background: 'rgba(147,51,234,0.12)', color: '#7C3AED' }
  };
  const labels = {
    'pending': 'En attente',
    'approved': 'Validé',
    'rejected': 'Refusé',
    'modification_requested': 'Modif. demandée'
  };
  return (
    <span className="px-3 py-1 rounded-full text-[11px] font-bold" style={styles[status] || {}}>
      {labels[status] || status}
    </span>
  );
};

export default StatusBadge;