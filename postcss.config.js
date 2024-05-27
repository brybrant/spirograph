import autoprefixer from 'autoprefixer';
import purgeCSSPlugin from '@fullhuman/postcss-purgecss';

// https://github.com/postcss/postcss-load-config
export default () => ({
  plugins: [
    autoprefixer({
      flexbox: false,
    }),
    purgeCSSPlugin({
      content: ['index.html', './src/**/*.vue'],
      safelist: ['router-link-active'],
    }),
  ],
});
