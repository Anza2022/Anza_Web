const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./presentation/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    blur: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // main: "#040484",
        main: "#008080",
        darksec: colors.slate[800],
        darkmain: colors.gray[900],
        secondary: colors.fuchsia[600],
      },
      animation: {
        "spin-fast": "spin 1s linear infinite",
        "pulse-fast": "pulse .4s cubic-bezier(0.6, 0.1, 0.9, 1) infinite;",
      },
    },
  },
  fontFamily: {
    sans: [
      "Quicksand",
      "Poppins",
      "Montserrat",
      "sans-serif",
      ...defaultTheme.fontFamily.sans,
    ],
  },

  plugins: [],
};
