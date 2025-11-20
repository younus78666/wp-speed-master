/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  theme: {
    extend: {
      colors: {
        speed: {
          light: '#4ade80', // green-400
          DEFAULT: '#22c55e', // green-500
          dark: '#16a34a', // green-600
        },
        tech: {
          dark: '#0f172a', // slate-900
          card: '#1e293b', // slate-800
          text: '#94a3b8', // slate-400
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}