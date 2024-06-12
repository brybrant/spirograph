import eslintPluginVue from 'eslint-plugin-vue';

import { eslintConfig } from '@brybrant/configs';

export default eslintConfig(eslintPluginVue.configs['flat/recommended']);