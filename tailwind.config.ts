import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
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
        // TODO: Refactor text, background and border color usage since they are all slate.
        text: colors.slate,
        background: colors.slate,
        border: colors.slate,
      },
    },
  },
  plugins: [],
} satisfies Config;
