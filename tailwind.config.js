/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  extend: {
    animation: {
      'fadeIn': 'fadeIn 0.2s ease-in-out',
      'slideDown': 'slideDown 0.3s ease-in-out',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      slideDown: {
        '0%': { transform: 'translateY(-100%)' },
        '100%': { transform: 'translateY(0)' },
      },
    },
    scale: {
      '102': '1.02',
    },
  },
  plugins: [],
}

