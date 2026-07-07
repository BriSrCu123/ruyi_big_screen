import { createRouter, createWebHistory } from 'vue-router';

import DashboardPage from '@/pages/dashboard/DashboardPage.vue';
import { AppRouteName, AppRoutePath } from '@/shared/constants/routes';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: AppRoutePath.Dashboard,
      name: AppRouteName.Dashboard,
      component: DashboardPage,
    },
  ],
});
