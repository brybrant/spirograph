import { createApp, type Component } from 'vue';
import { createHead } from '@unhead/vue/client';
import { createRouter, createWebHashHistory } from 'vue-router';

import app from './app.vue';

import MassPage from './pages/mass-page.vue';
import EnergyPage from './pages/energy-page.vue';
import LightPage from './pages/light-page.vue';

const head = createHead();

const router = createRouter({
  linkActiveClass: 'active',
  history: createWebHashHistory(),
  routes: [
    {
      path: '/mass',
      component: MassPage as Component,
    },
    {
      path: '/energy',
      component: EnergyPage as Component,
    },
    {
      path: '/light',
      component: LightPage as Component,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/mass',
    },
  ],
});

createApp(app as Component)
  .use(head)
  .use(router)
  .mount('#app');
