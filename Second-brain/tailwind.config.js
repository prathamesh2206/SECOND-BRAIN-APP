/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors:{
        gray:{
          200:'#f8fafc',
          100:'#fffefe',
          600:'#656975  '
        },
        purple:{
          600: '#5047e5',
          200:'#e0e6fe',
          500:'#453ab8'
        }
      }
    },
  },
  plugins: [],
}

