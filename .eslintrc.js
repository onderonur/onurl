module.exports = {
  extends: [
    // https://nextjs.org/docs/pages/building-your-application/configuring/eslint#additional-configurations
    'eslint:recommended',
    'prettier',
    'next/core-web-vitals',
  ],
  rules: {
    'no-console': 'warn',
    'no-alert': 'warn',
    'prefer-const': 'warn',
    'object-shorthand': 'warn',
    curly: 'warn',
    eqeqeq: 'warn',
    'no-param-reassign': 'error',
    'prefer-template': 'warn',
    'no-nested-ternary': 'warn',
    'import/no-duplicates': 'warn',
  },
  reportUnusedDisableDirectives: true,
  // Files starting with . are ignored by default.
  // This was causing a warning for lint-staged
  // and since we have --max-warnings 0, the check was failing.
  // So, we removed these files by using "!" from ignoredPatterns.
  ignorePatterns: ['!.*.{js,ts}'],
  // For eslint-plugin-deprecation:
  // https://github.com/gund/eslint-plugin-deprecation#prerequisites
  // https://stackoverflow.com/a/64488474/10876256
  overrides: [
    {
      // eslint-plugin-deprecation and some of @typescript-eslint rules only work for .ts and .tsx files.
      // So, linting was not working for .js files like postcss.config.js etc.
      // As a solution, we applied the plugin to only .ts and .tsx files.
      files: ['*.{ts,tsx}'],
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['deprecation'],
      // Contains all of recommended, recommended-type-checked, and strict,
      // along with additional strict rules that require type information.
      // https://typescript-eslint.io/linting/configs/#strict-type-checked
      extends: ['plugin:@typescript-eslint/strict-type-checked'],
      rules: {
        'deprecation/deprecation': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/prefer-destructuring': 'warn',
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/no-misused-promises': [
          'warn',
          { checksVoidReturn: false },
        ],
        '@typescript-eslint/await-thenable': 'warn',
        '@typescript-eslint/no-confusing-void-expression': 'warn',
        '@typescript-eslint/no-unnecessary-condition': 'off',
      },
    },
  ],
};
