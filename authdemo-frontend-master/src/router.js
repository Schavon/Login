import Vue from 'vue'
import Router from 'vue-router'
import auth from './auth';

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin.vue'),
      meta: { 
        requiresAuth: true
      }
    }
  ]
});

// If Auth is required && false, go to /login
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.isAuthenticated()) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;