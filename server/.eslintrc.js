module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    esversion: 6,
  },
  rules: {
    consistentReturn: 0,
  },
};
