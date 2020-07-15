module.exports = {
  env: {
    browser: true,
    es2020: true,
    jquery: true,
  },
  plugins: ['prettier'],
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
  },
};
