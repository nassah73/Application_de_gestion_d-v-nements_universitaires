import React, { useState } from 'react';
import OrgSidebar from '../components/OrgSidebar';
import OrgNavbar from '../components/OrgNavbar';

const StaffManager = () => {
  // 1. لستة ديال الطلبات اللي جاو من عند الطلبة (En attente)
  const [requests, setRequests] = useState([
    { id: 101, name: 'Yassine', email: 'yassine@edu.uiz.ac.ma' },
    { id: 102, name: 'Sara', email: 'sara@edu.uiz.ac.ma' }
  ]);

  // 2. لستة ديال الفريق اللي ديجا مقبول (Acceptés)
  const [team, setTeam] = useState([
    { id: 1, name: 'Ahmed', email: 'ahmed@uiz.ac.ma' }
  ]);

  // دالة للقبول
  const handleAccept = (req) => {
    setTeam([...team, req]); // كنزيدوه للفريق
    setRequests(requests.filter(item => item.id !== req.id)); // كنحييدوه من الطلبات
  };

  // دالة للرفض
  const handleReject = (id) => {
    setRequests(requests.filter(item => item.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <OrgSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <OrgNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* الجزء الأول: طلبات التطوع الجديدة */}
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span>📩 Demandes de Volontariat</span>
                <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                  {requests.length} nouvelles
                </span>
              </h2>
              {requests.length > 0 ? (
                <table className="w-full text-left">
                  <tbody className="divide-y">
                    {requests.map(req => (
                      <tr key={req.id}>
                        <td className="py-3 font-medium">{req.name}</td>
                        <td className="py-3 text-gray-500">{req.email}</td>
                        <td className="py-3 text-right space-x-2">
                          <button onClick={() => handleAccept(req)} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Accepter</button>
                          <button onClick={() => handleReject(req.id)} className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-50">Refuser</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-400 text-sm italic">Aucune demande en attente.</p>
              )}
            </div>

            {/* الجزء الثاني: الفريق الحالي (Staff) */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">👥 Équipe de l'Événement (Staff)</h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-gray-400 text-sm">
                    <th className="py-2">NOM</th>
                    <th className="py-2">EMAIL</th>
                    <th className="py-2">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {team.map(member => (
                    <tr key={member.id}>
                      <td className="py-3">{member.name}</td>
                      <td className="py-3 text-gray-500">{member.email}</td>
                      <td className="py-3">
                        <button className="text-red-500 text-sm hover:underline">Supprimer du staff</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffManager;