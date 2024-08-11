import { createApp } from 'vue';
import { createHead, VueHeadMixin } from '@unhead/vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import './app.scss';
import app from './app.vue';

import SourceButton from './components/source-button.vue';

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

createApp(app)
  .use(head)
  .use(router)
  .mixin(VueHeadMixin)
  .component('SourceButton', SourceButton)
  .mount('#app');
