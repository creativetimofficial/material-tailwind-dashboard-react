/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
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
  },
  plugins: [],
});
