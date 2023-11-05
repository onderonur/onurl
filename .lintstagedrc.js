// https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged
const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --max-warnings 0 --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*': 'prettier --write --ignore-unknown',
};
