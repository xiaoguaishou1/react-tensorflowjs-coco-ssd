/*
 * @Author: panghu
 * @Date: 2023-07-14 19:41:42
 * @LastEditors: panghu 760695955@qq.com
 * @LastEditTime: 2023-07-14 19:56:37
 * @FilePath: /tensorflow/.eslintrc.cjs
 * @Description: 
 * 
 */
/* eslint-env node */

module.exports = {
  root: false,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
}
