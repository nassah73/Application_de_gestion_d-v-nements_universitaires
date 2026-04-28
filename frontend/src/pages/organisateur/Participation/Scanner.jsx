import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import ScannerModal from '../components/ScannerModal';
import OrgSidebar from '../components/OrgSidebar';
import OrgNavbar from '../components/OrgNavbar';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // إعداد السكّانر
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 10,
    });

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(decodedText) {
      handleVerification(decodedText);
      scanner.clear();
    }

    function onScanError(err) {
      // Ignored for less console noise
    }

    return () => {
      try {
        scanner.clear();
      } catch (e) {
        console.error("Scanner clear error:", e);
      }
    };
  }, []);

  const handleVerification = async (ticketId) => {
    console.log("Vérification du ticket:", ticketId);
    
    // محاكاة استجابة من السيرفر
    const mockResponse = {
      success: true,
      message: "Ticket valide pour : Étudiant. Présence enregistrée."
    };

    setScanResult(mockResponse);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <OrgSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <OrgNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Scanner de Présence</h2>
              <p className="text-gray-500">Scannez le QR Code de l'étudiant pour valider son entrée.</p>
            </div>

            <div id="reader" className="overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-white"></div>

            <ScannerModal 
              isOpen={isModalOpen} 
              result={scanResult || {}} 
              onClose={() => {
                setIsModalOpen(false);
                window.location.reload();
              }} 
            />

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-bold text-blue-800 mb-1">💡 Conseil :</h4>
              <p className="text-xs text-blue-700">Assurez-vous que l'étudiant a augmenté la luminosité de son téléphone pour un scan rapide.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QRScanner;
