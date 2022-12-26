const { off } = require('process')

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    // 'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    // no use vars off
    'no-unused-vars': 'off',
    // use function()  no function ()
    'space-before-function-paren': 0,
    // 三元運算子 可以換行
    'multiline-ternary': 1,
    // no import React , don't show error
    "react/react-in-jsx-scope": "off",
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
