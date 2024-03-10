const { resolve } = require('node:path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:import/recommended', 'plugin:import/typescript'],
  settings: {
    'import/resolver': {
      typescript: {
        project: resolve(process.cwd(), 'tsconfig.json'),
      },
    },
  },
  rules: {
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',
  },
};
