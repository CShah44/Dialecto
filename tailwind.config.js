// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        array: ["Array"],
        jersey: ["Jersey"],
      },
      animation: {
        'spin-squares': 'spin-squares 2s infinite linear',
      },
      keyframes: {
        'spin-squares': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
