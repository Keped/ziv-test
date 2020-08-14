module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    ecmaVersion: 11,
    esversion: 6,
  },
  rules: {
    'consistent-return': 'off',
    'func-names': 'off',
  },
};
