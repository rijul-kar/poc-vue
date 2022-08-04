import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  linkExactActiveClass: 'active',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/users',
      name: 'users',
      component: () => import('../components/users/Users.vue'),
    },
    {
      path: '/user/:userId',
      name: 'user-detail',
      component: () => import('../components/users/UserDetail.vue'),
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../components/posts/Posts.vue'),
    },
    {
      path: '/',
      name: 'home',
      redirect: '/users',
    },
  ],
});

router.beforeEach((to, from) => {
  // console.log('BE', to, from);
});

export default router;
