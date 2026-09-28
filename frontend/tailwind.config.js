/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bis: {
          navy: '#0b1d3a',
          navyLight: '#142a52',
          gold: '#d4af37',
          goldLight: '#f3e5ab',
          tricolorOrange: '#FF9933',
          tricolorGreen: '#138808',
          slate: '#0f172a',
          surface: '#1e293b',
          border: '#334155',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
