/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sans: ['"Work Sans"', "sans-serif"],
      },
      colors: {
        primary: "#2028EB",
      },
    },
  },
  optimizeFonts: false,
  plugins: [require("tailwind-scrollbar-hide")],
};
