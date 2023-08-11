module.exports = {
  extends: [
    // https://nextjs.org/docs/pages/building-your-application/configuring/eslint#additional-configurations
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    'no-console': 'warn',
    'no-alert': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-const': 'warn',
    'object-shorthand': 'warn',
    curly: 'warn',
    eqeqeq: 'warn',
    'require-await': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  // Files starting with . are ignored by default.
  // This was causing a warning for lint-staged
  // and since we have --max-warnings 0, the check was failing.
  // So, we removed this file by using "!" from ignoredPatterns.
  ignorePatterns: ['!.lintstagedrc.js'],
  // For eslint-plugin-deprecation:
  // https://stackoverflow.com/a/64488474/10876256
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      // eslint-plugin-deprecation only works for .ts and .tsx files.
      // So, linting was not working for .js files like postcss.config.js etc.
      // As a solution, we applied the plugin to only .ts and .tsx files.
      extends: ['plugin:deprecation/recommended'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'deprecation/deprecation': 'warn',
      },
    },
  ],
};
