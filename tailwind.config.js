/** @type {import('tailwindcss').Config} */

import scrollbar from 'tailwind-scrollbar';

export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        101: '1.01',
        102: '1.02',
        103: '1.03',
        104: '1.04',
      },
      height: {
        '120': '30rem',
        '128': '32rem', // Nueva clase h-128
        '144': '36rem', // Nueva clase h-144
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.9s ease-out',
      },
    },
  },
  plugins: [
    scrollbar,
  ],
}

