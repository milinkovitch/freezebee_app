module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'airbnb/hooks', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/no-cycle': 'off',
    'no-unused-vars': 'off',
    'no-param-reassign': [2, { props: false }],
  },
};
