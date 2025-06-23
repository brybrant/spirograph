import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';

import { eslintConfig } from '@brybrant/configs';

export default eslintConfig(...eslintPluginVue.configs['flat/recommended'], {
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
  rules: {
    'vue/html-quotes': [1, 'single', { avoidEscape: true }],
    'vue/no-v-html': 0,
  },
});
