/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#11144B',
        secondary: '#0000FF',
      },
    },
  },
  plugins: [
     require('tailwind-scrollbar-hide'),
  ],
}
