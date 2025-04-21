"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.config.productionTip = false;
_vue.default.prototype.$eventHub = new _vue.default(); // load token from localStorage

/* Vue.prototype.$http = axios; */

const token = localStorage.getItem("token");

if (token) {
  /* Vue.prototype.$http.defaults.headers.common['Authorization'] = token; */
  _axios.default.defaults.headers.common['Authorization'] = token;
}

new _vue.default({
  router: _router.default,
  store: _store.default,
  render: h => h(_App.default)
}).$mount('#app');