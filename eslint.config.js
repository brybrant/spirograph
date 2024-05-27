import js from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
  js.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  eslintPluginPrettier,
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          'endOfLine': 'auto',
        },
      ],
    },
  },
];