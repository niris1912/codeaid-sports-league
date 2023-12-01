// router.js
import { createRouter, createWebHistory } from 'vue-router';
import SchedulePage from '../pages/Schedule.vue';
import LeaderboardPage from '../pages/Leaderboard.vue';
import Page404 from '../pages/404.vue';

const routes = [
  {
    path: '/',
    component: SchedulePage
  },
  {
    path: '/schedule',
    component: SchedulePage
  },
  {
    path: '/leaderboard',
    component: LeaderboardPage
  },
  {
    path: '/:catchAll(.*)', // This matches any path that hasn't been matched by other routes
    component: Page404 // This should be a component for your 404 page
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;