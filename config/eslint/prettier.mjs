import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import("eslint").Linter.Config} */
export const prettierConfig = [
  eslintConfigPrettier,
  {
    rules: {
      curly: ['warn', 'multi-line'],
    },
  },
];
