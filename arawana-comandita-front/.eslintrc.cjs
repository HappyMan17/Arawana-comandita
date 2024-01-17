module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-trailing-spaces": "error",
    "eol-last": ["error", "always"],
    "semi": [2, "always"],
    "max-len": ["error", { "code": 80,  "tabWidth": 2, "ignoreTrailingComments": true, "ignoreComments": true}],
    '@typescript-eslint/no-explicit-any': "off",
    "object-curly-spacing": ["error", "always"],
  },
}
