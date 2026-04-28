import React from 'react';
import OrgSidebar from '../components/OrgSidebar';
import OrgNavbar from '../components/OrgNavbar';

const ParticipantList = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <OrgSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <OrgNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Liste des Participants</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <p>Liste des participants à implémenter...</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParticipantList;
