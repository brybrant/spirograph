import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint2';
import stylelintPlugin from 'vite-plugin-stylelint';
import vuePlugin from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/spirograph/',
  plugins: [
    // https://stylelint.io/user-guide/configure/
    // https://stylelint.io/awesome-stylelint/
    stylelintPlugin({
      lintInWorker: true,
      config: {
        cache: true,
        extends: [
          'stylelint-config-standard-scss',
          'stylelint-config-prettier-scss',
          'stylelint-config-hudochenkov/order',
        ],
        fix: false,
        plugins: [
          'stylelint-high-performance-animation',
        ],
        rules: {
          'hue-degree-notation': 'number',
          'selector-pseudo-element-colon-notation': 'single',
          'value-keyword-case': ['lower', {
            camelCaseSvgKeywords: true,
          }],
          'plugin/no-low-performance-animation-properties': true,
        },
      },
    }),
    vuePlugin(),
    eslintPlugin({
      lintInWorker: true,
    })
  ],
  server: {
    host: '127.0.0.1',
    port: 3000,
    strictPort: true,
  },
});
