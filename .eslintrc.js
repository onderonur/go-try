/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    './config/eslint/javascript',
    './config/eslint/typescript',
    './config/eslint/import',
    './config/eslint/unicorn',
    './config/eslint/prettier',
  ],
  plugins: ['only-warn'],
  reportUnusedDisableDirectives: true,
  env: {
    node: true,
    browser: true,
  },
  ignorePatterns: ['dist', 'coverage'],
};
