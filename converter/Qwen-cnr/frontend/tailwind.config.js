/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#0B0F19',
        bgCard: '#111827',
        accent: '#3B82F6',
        positive: '#22C55E',
        negative: '#EF4444',
        textPrimary: '#E5E7EB',
      },
    },
  },
  plugins: [],
}
