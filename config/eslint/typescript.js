const { resolve } = require('node:path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: resolve(process.cwd(), 'tsconfig.json'),
      },
      // Contains all of recommended, recommended-type-checked, and strict,
      // along with additional strict rules that require type information.
      // https://typescript-eslint.io/linting/configs/#strict-type-checked
      extends: ['plugin:@typescript-eslint/strict-type-checked'],
      rules: {
        '@typescript-eslint/prefer-destructuring': 'warn',
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/no-misused-promises': [
          'warn',
          { checksVoidReturn: false },
        ],
      },
    },
  ],
};
