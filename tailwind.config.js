/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6D437D",
      },
    },
    fontFamily: {
      nunitoBold: ["NunitoBold", "Helvetica", "Arial", "sans-serif"],
      nunitoBoldItalic: [
        "NunitoBoldItalic",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      nicoMojiRegular: ["NicoMojiRegular", "Helvetica", "Arial", "sans-serif"],
    },
    screens: {
      '1359': '1359px',
      "min-[1359px]": "1359px"
      // => @media (min-width: 1359px) { ... }
    },
  },
  plugins: [],
});
