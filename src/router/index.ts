import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import HostDashboardView from '../views/host/HostDashboardView.vue';
import HostRootView from '../views/host/HostRootView.vue';
import VmConsoleView from '../views/vm/VmConsoleView.vue';
import VmRootView from '../views/vm/VmRootView.vue';
import pool from '@/router/pool';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    pool,
    {
      path: '/host/:uuid',
      component: HostRootView,
      children: [
        {
          path: '',
          name: 'host.dashboard',
          component: HostDashboardView,
        },
      ],
    },
    {
      path: '/vm/:uuid',
      component: VmRootView,
      children: [
        {
          path: 'console',
          name: 'vm.console',
          component: VmConsoleView,
        },
      ],
    },
  ],
});

export default router;
