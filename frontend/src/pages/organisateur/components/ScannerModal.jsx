const ScannerModal = ({ isOpen, result, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
          <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 ${
            result.success ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {result.success ? (
              <span className="text-4xl text-green-600">✅</span>
            ) : (
              <span className="text-4xl text-red-600">❌</span>
            )}
          </div>
          
          <h2 className={`text-xl font-bold mb-2 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
            {result.success ? 'Accès Autorisé' : 'Accès Refusé'}
          </h2>
          
          <p className="text-gray-600 mb-6">{result.message}</p>
          
          <button 
            onClick={onClose}
            className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition"
          >
            Continuer le scan
          </button>
        </div>
      </div>
    );
  };
  
  export default ScannerModal;