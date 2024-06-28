/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#424874',
        secondarylight: '#f4eeff',
        darker: '#393646',
      },
    },
  },
  plugins: [
  ],
}

