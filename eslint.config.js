import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';

import eslintConfig from '@brybrant/eslint-config';

export default eslintConfig({
  extends: eslintPluginVue.configs['flat/recommended'],
  files: ['./**/*.vue'],
  languageOptions: {
    parser: vueParser,
    globals: globals.browser,
    parserOptions: {
      extraFileExtensions: ['.vue'],
      parser: tsParser,
      projectService: true,
    },
  },
  rules: {
    // https://github.com/prettier/prettier/issues/5828
    // 'vue/html-quotes': [1, 'single', { avoidEscape: true }],
    'vue/no-v-html': 0,
  },
});
