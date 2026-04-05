import viteConfig from '@brybrant/vite-config';

import vuePlugin from '@vitejs/plugin-vue';

export default viteConfig({
  base: '/spirograph/',
  plugins: [vuePlugin()],
});
