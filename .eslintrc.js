module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 0,
    'no-console': 0,
    curly: 0,
    'no-restricted-syntax': 0,
    'import/prefer-default-export': 0,
    'no-return-await': 0,
    'no-underscore-dangle': 0,
  },
};
