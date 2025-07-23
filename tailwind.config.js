/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      // Custom font 
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },

      //  Custom colors 
      colors: {
        
        primaryFont: '#0E0E0E',      // Primary font color (used for headings, body text, etc.)
        secondary: '#0000FFBB',      //  Secondary color (used for buttons, links, highlights)
        background: '#FFFFFF',       //  Background color (base layout, cards, sections)        
        border: '#DBDBDB',           //  Used for borders, dividers, input outlines, etc.        
        tabBg: '#DBDBDB',            // Background for small tabs (same as border color)        
        placeholder: '#8C8C8C',      //  Color for input field placeholder text       
        primary: '#11144B',          //  Already defined in your previous config (base primary color)       
        secondaryBase: '#0000FF',    //  Already defined as secondary highlight (can be used interchangeably)
     
        //  Optional: reusable neutral color tokens
        lightGray: '#DBDBDB',
        darkGray: '#8C8C8C',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), 
  ],
}
