import { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
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

export default config;
