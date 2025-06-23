import { createApp } from 'vue';
import { createHead, VueHeadMixin } from '@unhead/vue/client';
import { createRouter, createWebHashHistory } from 'vue-router';

import './app.scss';
import app from './app.vue';

import SourceButton from './components/source-button.vue';
import CanvasElement from './components/canvas.vue';

import MassPage from './pages/mass.vue';
import EnergyPage from './pages/energy.vue';
import LightPage from './pages/light.vue';

const head = createHead();

const router = createRouter({
  linkActiveClass: 'active',
  history: createWebHashHistory(),
  routes: [
    {
      path: '/mass',
      component: MassPage,
    },
    {
      path: '/energy',
      component: EnergyPage,
    },
    {
      path: '/light',
      component: LightPage,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/mass',
    },
  ],
});

const globals = {
  install(Vue) {
    Object.defineProperty(Vue.config.globalProperties, '$rad360', {
      value: Math.PI * 2,
      enumerable: true,
    });
  },
};

createApp(app)
  .use(head)
  .use(router)
  .use(globals)
  .mixin(VueHeadMixin)
  .component('CanvasElement', CanvasElement)
  .component('SourceButton', SourceButton)
  .mount('#app');
