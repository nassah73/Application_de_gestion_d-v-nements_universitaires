import React, { useState } from 'react';
import OrgSidebar from '../components/OrgSidebar';
import OrgNavbar from '../components/OrgNavbar';
import ParticipantsTable from '../components/ParticipantsTable';
import { 
  Users, 
  Search, 
  Download, 
  Filter,
  ArrowLeft,
  FileSpreadsheet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ParticipantList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const mockParticipants = [
    {
      student: {
        firstName: 'Ahmed',
        lastName: 'Alami',
        email: 'ahmed.alami@uiz.ac.ma',
        studentCardNumber: 'S123456'
      },
      registeredAt: '2024-05-20T10:30:00',
      status: 'present'
    },
    {
      student: {
        firstName: 'Sara',
        lastName: 'Benali',
        email: 'sara.benali@uiz.ac.ma',
        studentCardNumber: 'S789012'
      },
      registeredAt: '2024-05-21T14:15:00',
      status: 'pending'
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>
      <OrgSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <OrgNavbar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <button 
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center gap-2 text-white/40 hover:text-orange-500 transition-colors uppercase text-xs font-black tracking-widest"
            >
              <ArrowLeft size={16} />
              Retour aux détails
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                  <Users size={32} className="text-orange-500" />
                  Liste des Participants
                </h1>
                <p className="text-white/40 mt-1 uppercase text-xs font-bold tracking-widest">
                  Gérez les inscriptions et la présence en temps réel
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs font-black uppercase tracking-widest">
                  <FileSpreadsheet size={16} />
                  Exporter CSV
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-all text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(205,115,41,0.2)]">
                  <Download size={16} />
                  PDF Rapport
                </button>
              </div>
            </div>

            {/* Stats / Filters Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">Total Inscrits</div>
                <div className="text-2xl font-black text-white">124</div>
              </div>
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">Présents</div>
                <div className="text-2xl font-black text-green-500">86</div>
              </div>
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">Absents</div>
                <div className="text-2xl font-black text-yellow-500">38</div>
              </div>
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">Taux de présence</div>
                <div className="text-2xl font-black text-orange-500">69%</div>
              </div>
            </div>

            {/* Search and Table */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="text"
                  placeholder="Rechercher un participant (Nom, Email, ID)..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-orange-500/50 transition-all placeholder:text-white/10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <ParticipantsTable participants={mockParticipants} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParticipantList;
