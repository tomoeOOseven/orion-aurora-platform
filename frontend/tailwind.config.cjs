/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050810",
        foreground: "#e8eaf0",
        muted: "#6b7280",
        primary: "#7eff29",
        secondary: "#9ea1ff"
      },
      boxShadow: {
        aurora: "0 0 20px rgba(126,255,41,0.35)"
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
};
