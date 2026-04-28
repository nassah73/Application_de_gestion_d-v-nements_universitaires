import React, { useState } from 'react';
import OrgSidebar from '../components/OrgSidebar';
import OrgNavbar from '../components/OrgNavbar';
import { 
  Users, 
  UserPlus, 
  CheckCircle2, 
  XCircle, 
  Mail, 
  ArrowLeft, 
  Trash2, 
  ShieldCheck,
  Zap,
  UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StaffManager = () => {
  const navigate = useNavigate();
  // 1. Liste des demandes (En attente)
  const [requests, setRequests] = useState([
    { id: 101, name: 'Yassine', email: 'yassine@edu.uiz.ac.ma', role: 'Logistique' },
    { id: 102, name: 'Sara', email: 'sara@edu.uiz.ac.ma', role: 'Communication' }
  ]);

  // 2. Liste de l'équipe acceptée
  const [team, setTeam] = useState([
    { id: 1, name: 'Ahmed', email: 'ahmed@uiz.ac.ma', role: 'Responsable Staff' }
  ]);

  const handleAccept = (req) => {
    setTeam([...team, req]);
    setRequests(requests.filter(item => item.id !== req.id));
  };

  const handleReject = (id) => {
    setRequests(requests.filter(item => item.id !== id));
  };

  const handleDeleteMember = (id) => {
    setTeam(team.filter(member => member.id !== id));
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>
      <OrgSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <OrgNavbar />
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <button 
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center gap-2 text-white/40 hover:text-orange-500 transition-colors uppercase text-xs font-black tracking-widest"
            >
              <ArrowLeft size={16} />
              Retour aux détails
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                  <Users size={32} className="text-orange-500" />
                  Gestion du Staff
                </h1>
                <p className="text-white/40 mt-1 uppercase text-xs font-bold tracking-widest">
                  Recrutez et gérez votre équipe de bénévoles
                </p>
              </div>
              <div className="flex gap-4">
                <div className="px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center min-w-[120px]">
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">Total Staff</div>
                  <div className="text-2xl font-black text-white">{team.length}</div>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-center min-w-[120px]">
                  <div className="text-[10px] font-black text-orange-500/40 uppercase tracking-widest">Demandes</div>
                  <div className="text-2xl font-black text-orange-500">{requests.length}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
              
              {/* Demandes de Volontariat */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <UserPlus size={18} className="text-yellow-500" />
                  <h2 className="text-lg font-black text-white uppercase tracking-wider">Demandes en attente</h2>
                </div>
                
                {requests.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {requests.map(req => (
                      <div key={req.id} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 flex items-center justify-center border border-yellow-500/20">
                              <span className="text-yellow-500 font-black text-sm uppercase">{req.name.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white uppercase tracking-tight">{req.name}</div>
                              <div className="text-[10px] text-white/30 font-black uppercase tracking-widest">{req.role}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleAccept(req)} className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all">
                              <CheckCircle2 size={16} />
                            </button>
                            <button onClick={() => handleReject(req.id)} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                              <XCircle size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-white/40 text-xs">
                          <Mail size={12} className="text-orange-500/50" />
                          {req.email}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 rounded-2xl border border-dashed border-white/10 bg-white/[0.01] text-center">
                    <p className="text-white/20 font-medium italic">Aucune nouvelle demande pour le moment.</p>
                  </div>
                )}
              </section>

              {/* Équipe Actuelle */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <UserCheck size={18} className="text-green-500" />
                  <h2 className="text-lg font-black text-white uppercase tracking-wider">Équipe de l'Événement</h2>
                </div>
                
                <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/[0.03] border-b border-white/5">
                        <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Membre</th>
                        <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Email</th>
                        <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Rôle</th>
                        <th className="px-6 py-4 text-right text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {team.map(member => (
                        <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center border border-orange-500/20">
                                <span className="text-orange-500 font-black text-xs uppercase">{member.name.charAt(0)}</span>
                              </div>
                              <span className="text-sm font-bold text-white uppercase tracking-tight">{member.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-white/40 font-medium">{member.email}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                              {member.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => handleDeleteMember(member.id)}
                              className="p-2 rounded-lg text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffManager;