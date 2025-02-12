import { useState, useEffect } from 'react';

const BotonInstallApp = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Escuchar el evento 'beforeinstallprompt'
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Limpieza del evento al desmontar el componente
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('El usuario aceptó la instalación');
      } else {
        console.log('El usuario rechazó la instalación');
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  if (!isInstallable) {
    return null; // No mostrar el botón si la app no es instalable
  }

  return (
    <button 
        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-1 px-4 mx-auto rounded-full transition duration-300 ease-in-out flex items-center" 
        onClick={handleInstallClick}
    >
      Instalar App
    </button>
  );
};

export default BotonInstallApp;
