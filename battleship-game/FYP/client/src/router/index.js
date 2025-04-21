import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      requiresGuest: true
    }    
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/learn',
    name: 'Learn',
    component: () => import('../views/Learn.vue')
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import('../views/Play.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Route protection
router.beforeEach((to, from, next) => {
  // If going to profile page but not logged in 
  if (to.name == 'Profile' && !store.getters.isLoggedIn) {
    next('/login')
  }
  // If going to login or register page but already logged in 
  if ((to.name == 'Login' || to.name == 'Register') && store.getters.isLoggedIn) {
    next('/profile')
  } 
  // If no violation, just redirect as usual
  else {
    next()
  }
})

export default router
