/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: { 
        zinc: { 950: '#09090b' },
        ulbi: {
          orange: '#EA5329',
          blue: '#00277F',
          grey: '#EFEFEF',
          silver: '#D3D3D3',
        }
      }
    },
  },
  plugins: [],
}
