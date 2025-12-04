/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/src/**/*.{html,js}",
      "./app/**/*.html"
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#64A85F',
            50: '#E8F5E6',
            100: '#D1EBC9',
            200: '#A3D894',
            300: '#8BCE7F',
            400: '#73C169',
            500: '#64A85F',
            600: '#508A4C',
            700: '#3C6739',
            800: '#284426',
            900: '#142213'
          }
        },
        fontFamily: {
          Colmeak: ['Colmeak', 'sans-serif'],
          sans: ['Quicksand', 'system-ui', 'sans-serif']
        }
      }
    },
    plugins: [],
  }