import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint2';
import stylelintPlugin from 'vite-plugin-stylelint';
import vuePlugin from '@vitejs/plugin-vue';

import * as configs from '@brybrant/configs';

export default defineConfig({
  base: '/spirograph/',
  css: {
    postcss: configs.postCSSConfig,
  },
  plugins: [
    stylelintPlugin({
      lintInWorker: true,
      config: configs.stylelintConfig,
    }),
    vuePlugin(),
    eslintPlugin({
      lintInWorker: true,
    }),
  ],
  server: {
    host: '127.0.0.1',
    port: 3000,
    strictPort: true,
  },
});
