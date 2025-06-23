import { stylelintConfig } from '@brybrant/configs';

const vueConfig = JSON.parse(JSON.stringify(stylelintConfig));

vueConfig.extends.splice(1, 0, 'stylelint-config-recommended-vue/scss');

export default vueConfig;
