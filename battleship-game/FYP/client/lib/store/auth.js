"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _index = _interopRequireDefault(require("../router/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const state = {
  token: localStorage.getItem('token') || '',
  user: localStorage.getItem('username') || {},
  status: ''
};
const getters = {
  isLoggedIn: state => !!state.token,
  // !! casts variable to boolean
  authState: state => state.status,
  user: state => state.user
};
const actions = {
  async login({
    commit
  }, user) {
    commit('auth_request');
    let res = await _axios.default.post('http://localhost:5000/api/users/login', user);

    if (res.data.success) {
      const payload = {
        token: res.data.token,
        user: res.data.user
      };
      localStorage.setItem('token', payload.token);
      localStorage.setItem('username', payload.user.username); // localStorage.setItem('gameState', JSON.stringify(payload.gameState))

      _axios.default.defaults.headers.common['Authorization'] = payload.token;
      commit('auth_success', payload);
    }

    return res;
  },

  async register({
    commit
  }, userData) {
    commit('register_request');
    let res = await _axios.default.post('http://localhost:5000/api/users/register', userData);

    if (res.data.success) {
      const payload = {
        token: res.data.token,
        user: res.data.user
      };
      localStorage.setItem('token', payload.token);
      localStorage.setItem('username', payload.user.username);
      _axios.default.defaults.headers.common['Authorization'] = payload.token;
      commit('auth_success', payload);
    }

    return res;
  },

  async logout({
    commit
  }) {
    commit('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    delete _axios.default.defaults.headers.common['Authorization'];

    _index.default.push('/login');
  },

  async logoutAndSave({
    commit
  }, gameData) {
    let res = await _axios.default.post('http://localhost:5000/api/games/saveUnfinished', gameData);

    if (res.data.success) {
      commit('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('gameState');
      delete _axios.default.defaults.headers.common['Authorization'];

      _index.default.push('/login');
    }

    return res;
  }

};
const mutations = {
  auth_request(state) {
    state.status = 'loading';
  },

  auth_success(state, payload) {
    state.token = payload.token;
    state.user = payload.user.username;
    state.status = 'success';
  },

  register_request(state) {
    state.status = 'loading';
  },

  register_success(state) {
    state.status = 'success';
  },

  logout(state) {
    state.token = '';
    state.username = {};
    state.status = '';
  }

};
var _default = {
  state,
  getters,
  actions,
  mutations
};
exports.default = _default;