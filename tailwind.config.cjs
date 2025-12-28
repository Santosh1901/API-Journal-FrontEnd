module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
