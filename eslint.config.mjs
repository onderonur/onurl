import onlyWarn from 'eslint-plugin-only-warn';
import { importConfig } from './config/eslint/import.mjs';
import { javascriptConfig } from './config/eslint/javascript.mjs';
import { nextConfig } from './config/eslint/next.mjs';
import { prettierConfig } from './config/eslint/prettier.mjs';
import { typescriptConfig } from './config/eslint/typescript.mjs';
import { unicornConfig } from './config/eslint/unicorn.mjs';

// https://nextjs.org/docs/app/api-reference/config/eslint#additional-configurations
/** @type {import("eslint").Linter.Config} */
const config = [
  ...javascriptConfig,
  ...typescriptConfig,
  ...importConfig,
  ...unicornConfig,
  ...prettierConfig,
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ['src/core/gql'],
  },
  ...nextConfig,
];

export default config;
