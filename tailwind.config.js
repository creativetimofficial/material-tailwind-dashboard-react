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
      nunitoBoldItalic: ["NunitoBoldItalic", "Helvetica", "Arial", "sans-serif"],
      nunitoRegular: ["NunitoRegular", "Helvetica", "Arial", "sans-serif"],
      nicoMojiRegular: ["NicoMojiRegular", "Helvetica", "Arial", "sans-serif"],
      gideonRomanRegular: ["GideonRomanRegular", "Helvetica", "Arial", "sans-serif"],
    },
    screens: {
      "1359px": { min: "1359px" },
      "1140px": { min: "1140px", max: "1358px" },
      "1087px": { min: "1087px", max: "1139px" },
      "843px": { min: "843px", max: "1086px" },
      "600px": { min: "600px", max: "842px" },
      // => @media (min-width: 1359px) { ... }
    },
  },
  plugins: [],
});
