/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        'blue-custom': '#3D52A0',
        'washed-blue': {
          DEFAULT: '#abcdef', 
          '700': '#4a61b5',   
        },
      },
      borderWidth: {
        '0.7': '0.7px',
        '1.39': '1.39px',
      },
      fontSize: {
        'regular': '18px',
      },
    },
  },
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

