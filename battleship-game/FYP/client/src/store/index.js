import Vue from 'vue'
import Vuex from 'vuex'

import Auth from './auth'
import Ship from './ship'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth,
    Ship
  }
})
