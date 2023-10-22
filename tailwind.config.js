/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,css}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/images/transparenteGeschenke.png')"
      }
    },
  },
  plugins: [],
}

