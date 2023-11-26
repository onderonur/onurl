/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  plugins: [
    'prettier-plugin-packagejson',
    // Should be the last one.
    // https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file#compatibility-with-other-prettier-plugins
    'prettier-plugin-tailwindcss',
  ],
};
