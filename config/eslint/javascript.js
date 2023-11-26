/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['eslint:recommended'],
  rules: {
    'no-console': 'warn',
    'no-alert': 'warn',
    'prefer-const': 'warn',
    'object-shorthand': 'warn',
    // TODO: `curly` rule is not working when it is in this extended config file.
    // But it works when set in root level `.eslintrc.js`.
    curly: 'warn',
    eqeqeq: 'warn',
    'no-unused-vars': 'warn',
    'no-param-reassign': 'error',
    'prefer-template': 'warn',
    'no-nested-ternary': 'warn',
    'no-empty': 'warn',
  },
};
