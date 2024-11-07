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
      }
    },
  },
  plugins: [],
};
