/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_sidebar : 'linear-gradient(to right, #ff0000, #808080)',
        secondary_sidebar : 'linear-gradient(to right, #00ff00, #808080)'        
      },
    },
  },
  plugins: [],
});
