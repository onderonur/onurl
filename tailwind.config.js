const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      colors: {
        primary: colors.rose,
        success: colors.green,
        error: colors.red,
        disabled: colors.gray,
        background: colors.indigo,
      },
    },
  },
  plugins: [],
};
