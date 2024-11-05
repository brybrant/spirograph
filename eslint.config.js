import eslintPluginVue from 'eslint-plugin-vue';

import { eslintConfig } from '@brybrant/configs';

export default eslintConfig(...eslintPluginVue.configs['flat/recommended'], {
  rules: {
    'vue/html-quotes': [1, 'single', { avoidEscape: true }],
    'vue/no-v-html': 0,
  },
});
