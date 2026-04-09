/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0D0D0D',
        acid: '#E8F227',
        paper: '#F5F0E8',
        ash: '#A8A49C',
        vermillion: '#D4341A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
        accent: ['"Fraunces"', 'serif'],
      },
      letterSpacing: {
        system: '0.4em',
      },
      borderWidth: {
        hairline: '1px',
        bold: '6px',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        blink: 'blink 1.5s step-end infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
