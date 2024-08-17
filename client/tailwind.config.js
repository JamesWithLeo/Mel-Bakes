/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#424874',
        primarylight: "#a6b1e1",
        secondarylight: '#f4eeff',
        darker: '#393646',
        warning: '#fca5a5'
      },
    },
  },
  plugins: [
  ],
}

