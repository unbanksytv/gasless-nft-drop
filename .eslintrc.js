const sharedRules = {
  'global-require': 0,
  'import/extensions': 0,
  'import/no-import-module-exports': 0,
  'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  'no-underscore-dangle': 0,
  'no-console': [
    2,
    {
      allow: ['warn', 'error'],
    },
  ],
  'no-param-reassign': [
    2,
    { props: true, ignorePropertyModificationsFor: ['state', 'req'] },
  ],
  'no-restricted-syntax': [
    2,
    'ForInStatement',
    'LabeledStatement',
    'WithStatement',
  ],
  'simple-import-sort/exports': 2,
  'simple-import-sort/imports': [
    2,
    {
      groups: [
        // Node.js builtins. You could also generate this regex if you use a `.js` config.
        // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
        [
          '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
        ],
        // Packages. `react` related packages come first.
        ['^react$'],
        // Internal packages.
        ['^@?\\w'],
        // Side effect imports.
        ['^\\u0000'],
        // Parent imports. Put `..` last.
        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
        // Other relative imports. Put same-folder imports and `.` last.
        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        // Style imports.
        ['^.+\\.s?css$'],
      ],
    },
  ],
};

module.exports = {
  root: true,
  plugins: ['simple-import-sort'],
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['simple-import-sort'],
      extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:@next/next/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        ...sharedRules,
        'react/prop-types': 0,
        'react/jsx-props-no-spreading': 0,
        'react/react-in-jsx-scope': 0,
        'react/require-default-props': 0,
        'react/function-component-definition': 0,
        'jsx-a11y/anchor-is-valid': 0,
        '@typescript-eslint/no-unused-vars': [
          2,
          { argsIgnorePattern: '^_', ignoreRestSiblings: true },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 0,
      },
    },
    {
      files: ['**/*.spec.ts', '**/*.spec.tsx'],
      plugins: ['jest'],
      extends: ['plugin:jest/all', 'plugin:testing-library/react'],
      rules: {
        'jest/no-hooks': 0,
      },
    },
  ],
  rules: sharedRules,
  settings: {
    react: {
      version: 'detect',
    },
  },
};
