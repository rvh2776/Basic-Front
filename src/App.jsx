import { registerSW } from 'virtual:pwa-register';
import { AppRouter } from './router/AppRouter';
import { useEffect } from 'react';

import './App.css';
import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from './context/ThemeProvider';

const updateSW = registerSW({
  onNeedRefresh() {
    // Notificar al usuario que hay una nueva versión disponible
    const confirmed = window.confirm('Nueva versión disponible. ¿Quieres actualizar?');
    if (confirmed) {
      updateSW(); // Actualiza la aplicación
    }
  },
  onOfflineReady() {
    console.log('La aplicación está lista para ser usada offline');
  },
});

function App() {

  useEffect(() => {
    // Lógica adicional que pueda necesitar
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRouter/>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
