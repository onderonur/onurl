/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    // https://nextjs.org/docs/app/building-your-application/configuring/eslint#additional-configurations
    './config/eslint/javascript',
    './config/eslint/typescript',
    './config/eslint/import',
    './config/eslint/unicorn',
    './config/eslint/prettier',
    'next/core-web-vitals',
    'next/typescript',
  ],
  plugins: ['only-warn'],
  reportUnusedDisableDirectives: true,
};
