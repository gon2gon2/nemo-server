export default {
    env: {
      browser: true,
      es2021: true,
      node: true,
      jest: true
    },
  
    extends: ['airbnb-base', 'prettier'],
    parserOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
  };
  