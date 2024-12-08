import js from '@eslint/js';

/** @type {import("eslint").Linter.Config} */
export const javascriptConfig = [
  js.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
      'no-alert': 'warn',
      'object-shorthand': 'warn',
      eqeqeq: 'warn',
      'no-param-reassign': 'warn',
      'prefer-template': 'warn',
      'no-nested-ternary': 'warn',
      'no-else-return': 'warn',
    },
  },
];
