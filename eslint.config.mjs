import globals from 'globals';
import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
  {
    ignores: [
      'eslint.config.mjs',
      'webpack.config.js',
    ]
  },
  {
    plugins: {
      '@stylistic/js': stylisticJs,

    },
    rules: {
      "@stylistic/js/space-before-function-paren": ["off", 'never'],
      // '@stylistic/js/space-before-function-paren': "off",
      '@stylistic/js/quotes': ['warn', 'single', { avoidEscape: true }],
      '@stylistic/js/eol-last': ['off', 'never'],
      '@stylistic/js/function-paren-newline': ["warn", { "minItems": 3 }],
      '@stylistic/js/object-curly-spacing': ['warn', 'always'],
      '@stylistic/js/multiline-comment-style': ['off', 'separate-lines'],
      '@stylistic/js/function-call-argument-newline': ["error", "consistent"],
      '@stylistic/js/indent': ['warn', 4, { "SwitchCase": 1 }]

    },
    languageOptions: { globals: globals.browser }
  },
  stylisticJs.configs["all-flat"],
  // pluginJs.configs.recommended,
];