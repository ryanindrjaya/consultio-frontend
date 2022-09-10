/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sans: ['"Work Sans"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
      },
      colors: {
        primary: "#437EEB",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-14deg)" },
          "50%": { transform: "rotate(14deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
      },
    },
  },
  optimizeFonts: false,
  plugins: [require("tailwind-scrollbar-hide")],
};
