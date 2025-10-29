/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandYellow: "#F1D35B",   // CTA
        brandDark: "#0F1724",     // headings
        cardGrey: "#f1f1f1",      // card background area
        mutedText: "#6b6b6b",
        pageBg: "#fafafa"
      },
      borderRadius: {
        'xl-2': '1rem'
      },
      boxShadow: {
        subtle: '0 3px 8px rgba(16,24,40,0.06)',
        header: '0 6px 12px rgba(16,24,40,0.06)'
      }
    },
  },
  plugins: [],
}
