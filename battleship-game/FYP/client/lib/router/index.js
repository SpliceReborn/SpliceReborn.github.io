"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../views/Home.vue"));

var _index = _interopRequireDefault(require("../store/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue.default.use(_vueRouter.default);

const routes = [{
  path: '/',
  name: 'Home',
  component: _Home.default
}, {
  path: '/about',
  name: 'About',
  component: () => Promise.resolve().then(() => _interopRequireWildcard(require('../views/About.vue')))
}, {
  path: '/register',
  name: 'Register',
  component: () => Promise.resolve().then(() => _interopRequireWildcard(require('../views/Register.vue'))),
  meta: {
    requiresGuest: true
  }
}, {
  path: '/login',
  name: 'Login',
  component: () => Promise.resolve().then(() => _interopRequireWildcard(require('../views/Login.vue'))),
  meta: {
    requiresGuest: true
  }
}, {
  path: '/learn',
  name: 'Learn',
  component: () => Promise.resolve().then(() => _interopRequireWildcard(require('../views/Learn.vue')))
}, {
  path: '/play',
  name: 'Play',
  component: () => Promise.resolve().then(() => _interopRequireWildcard(require('../views/Play.vue')))
}, {
  path: '/profile',
  name: 'Profile',
  component: () => Promise.resolve().then(() => _interopRequireWildcard(require('../views/Profile.vue'))),
  meta: {
    requiresAuth: true
  }
}];
const router = new _vueRouter.default({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
}); // Route protection

router.beforeEach((to, from, next) => {
  // If going to profile page but not logged in 
  if (to.name == 'Profile' && !_index.default.getters.isLoggedIn) {
    next('/login');
  } // If going to login or register page but already logged in 


  if ((to.name == 'Login' || to.name == 'Register') && _index.default.getters.isLoggedIn) {
    next('/profile');
  } // If no violation, just redirect as usual
  else {
    next();
  }
});
var _default = router;
exports.default = _default;