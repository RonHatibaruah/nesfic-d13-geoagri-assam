/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        assam: {
          green: "#065f46",
          lightGreen: "#10b981",
          gold: "#d97706",
          amber: "#f59e0b",
          dark: "#0f172a",
          card: "#1e293b",
          border: "#334155"
        }
      }
    },
  },
  plugins: [],
}
