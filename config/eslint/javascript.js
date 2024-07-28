/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['eslint:recommended'],
  rules: {
    'no-console': 'warn',
    'no-alert': 'warn',
    'object-shorthand': 'warn',
    eqeqeq: 'warn',
    'no-param-reassign': 'warn',
    'prefer-template': 'warn',
    'no-nested-ternary': 'warn',
  },
};
