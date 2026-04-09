/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0f19',
        card: '#111827',
        accent: '#3b82f6',
        positive: '#22c55e',
        negative: '#ef4444',
      },
      fontFamily: {
        sans: ['Manrope', 'Segoe UI', 'sans-serif'],
        display: ['Space Grotesk', 'Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
