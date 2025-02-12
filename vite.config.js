import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // registerType: 'autoUpdate', //? Actualiza la app sin preguntarle al usuario.
      registerType: 'prompt', //? Fuerza a que se use la logica que esta en app.js para preguntar al usuario si quiere actualizar la misma.
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'videos/landingPageVideo.mp4'],
      manifest: {
        name: 'Basic FrontEnd',
        short_name: 'basic-front',
        description: 'FrontEnd basico para iniciar proyectos',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'images/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'images/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      //? Configuraciones adicionales para el caché.
      workbox: {
        runtimeCaching: [
          {
            // Cache de tu video
            urlPattern: /.*\/videos\/.*\.(mp4|webm|ogg)$/, // Patrón para videos.
            handler: 'CacheFirst', // Cache primero.
            options: {
              cacheName: 'video-cache',
              expiration: {
                maxEntries: 10, // Limita la cantidad de videos que se cachean
                maxAgeSeconds: 60 * 60 * 24 * 7, // Duración de la cache (1 semana)
              },
            },
          },
          {
            urlPattern: /.*\/images\/.*\.(png|webp|jpg|jpeg)$/, // Patrón para imagenes.
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7, // Duración de la cache (1 semana)
              },
            },
          },
        ],
      },
    }),
  ],
  base: '/',
});
