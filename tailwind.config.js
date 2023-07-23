/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'vibes': ['Great Vibes', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
        'forum': ['Forum', 'cursive']

      },
      colors: {
        'primary': 'rgb(56 189 248)',
        'secondary': 'rgb(252 211 77)',
      }
    },
  },
  plugins: [require("daisyui")],
}

