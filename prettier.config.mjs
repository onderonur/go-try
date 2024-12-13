/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-packagejson'],
};

export default config;
