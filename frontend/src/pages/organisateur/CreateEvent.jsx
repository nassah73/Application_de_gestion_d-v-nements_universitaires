import React, { useState } from 'react';
import OrgSidebar from './components/OrgSidebar';
import OrgNavbar from './components/OrgNavbar';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    categorie: '',
    dateDebut: '',
    dateFin: '',
    lieu: '',
    capaciteMax: '',
    image: null,
    tags: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا غاتكون عملية الإرسال للـ Backend (Node.js)
    console.log("Données envoyées à l'administration:", formData);
    alert("Demande envoyée avec succès ! En attente de validation.");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <OrgSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <OrgNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Créer un nouvel événement</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Titre - */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Titre de l'événement *</label>
                <input 
                  type="text" name="titre" required minLength="5" maxLength="100"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                />
              </div>

              {/* Description - */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description détaillée *</label>
                <textarea 
                  name="description" required minLength="50" rows="4"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Catégorie - */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Catégorie *</label>
                <select name="categorie" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" onChange={handleChange}>
                  <option value="">Choisir...</option>
                  <option value="Culturel">Culturel</option>
                  <option value="Sportif">Sportif</option>
                  <option value="Scientifique">Scientifique</option>
                </select>
              </div>

              {/* Capacité Max - */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacité Max (1-5000) *</label>
                <input 
                  type="number" name="capaciteMax" required min="1" max="5000"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                />
              </div>

              {/* Date Début - */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Date et Heure de début *</label>
                <input 
                  type="datetime-local" name="dateDebut" required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                />
              </div>

              {/* Date Fin - */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Date et Heure de fin *</label>
                <input 
                  type="datetime-local" name="dateFin" required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                />
              </div>

              {/* Lieu - */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Lieu (Salle/Amphi) *</label>
                <input 
                  type="text" name="lieu" required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                />
              </div>

              {/* Image - */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Image / Poster (Max 5MB)</label>
                <input 
                  type="file" accept="image/png, image/jpeg"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                />
              </div>

              <div className="md:col-span-2 mt-4">
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  Soumettre pour validation
                </button>
              </div>

            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateEvent;
