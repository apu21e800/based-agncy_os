module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  parserOptions: {
    project: './tsconfig.app.json'
  },
  extends: ['standard-with-typescript', 'plugin:react/recommended'],
  plugins: ['react', 'react-hooks'],
  settings: {
    react: { version: 'detect' }
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'react/react-in-jsx-scope': 'off'
  }
};
