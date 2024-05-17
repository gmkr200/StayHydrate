/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c4e8bd",
        secondary: "#9cb997"
      },
    },
  },
  plugins: [],
}

