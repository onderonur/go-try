module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    // To fix '"describe" is not defined' and
    // '"it" is not defined' errors in test files.
    mocha: true,
    // To fix '"expect" is not defined' error in test files.
    jest: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'arrow-body-style': 'off',
    // To fix the 'Missing file extension "ts" for "../src"' in test folder.
    // https://stackoverflow.com/a/59268871/10876256
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
