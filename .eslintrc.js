module.exports = {
  env: {
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard', 'plugin:jest/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 0
  }
}
