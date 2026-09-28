import viteConfig from '@brybrant/vite-config';

import vuePlugin from '@vitejs/plugin-vue';
import { Unhead } from '@unhead/vue/vite';

export default viteConfig({
  base: '/spirograph/',
  plugins: [vuePlugin(), Unhead()],
});
