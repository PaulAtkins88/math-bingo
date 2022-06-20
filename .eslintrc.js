module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    'plugin:import/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src'],
      },
    },
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
  },
  rules: {
    '@typescript-eslint/comma-dangle': 'off',
    'eol-last': 'off',
    'linebreak-style': 'off',
    'prefer-template': 'warn',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/indent': 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
  },
};
