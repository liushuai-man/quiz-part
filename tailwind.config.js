/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e5383b',
        green: '#4f772d',
        red: '#ba181b',
        white: '#ffffff',
        'gray-200': '#d3d3d3',
        'gray-400': '#9b9a9a',
        gray: '#161a1d',
        black: '#0b090a',
      },
    },
  },
  plugins: [],
}