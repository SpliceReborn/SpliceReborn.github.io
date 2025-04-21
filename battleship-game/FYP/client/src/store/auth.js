import axios from 'axios';
import router from '../router/index'

const state = {
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('username') || {},
    status: '',
    error: null
};
const getters = {
    isLoggedIn: state => !!state.token, // !! casts variable to boolean
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error
};
const actions = {
    async login({commit }, user) {
        commit('auth_request');
        try {
            let res = await axios.post('/api/users/login', user)
            if (res.data.success) {
                const payload = {
                    token: res.data.token,
                    user: res.data.user,
                }
                localStorage.setItem('token', payload.token);
                localStorage.setItem('username', payload.user.username)
                // localStorage.setItem('gameState', JSON.stringify(payload.gameState))
                axios.defaults.headers.common['Authorization'] = payload.token;
                commit('auth_success', payload);
            }
            return res;
        } catch (err) {
            commit('auth_error', err);
        }
    },

    async register({commit}, userData) {
        try {
            commit('register_request');
            let res = await axios.post('/api/users/register', userData);
            if (res.data.success) {
                const payload = {
                    token: res.data.token,
                    user: res.data.user
                }
                localStorage.setItem('token', payload.token);
                localStorage.setItem('username', payload.user.username)
                axios.defaults.headers.common['Authorization'] = payload.token;
                commit('auth_success', payload);
            }
            return res;
        } catch (err) {
            commit ('register_error', err);
        }
    },

    async logout({commit}) {
        commit('logout');
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
    },

    async logoutAndSave({commit}, gameData) {
        let res = await axios.post('/api/games/saveUnfinished', gameData)
        if (res.data.success) {
            commit('logout');
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('gameState')
            delete axios.defaults.headers.common['Authorization'];
            router.push('/login');
        }
        return res
    },
};
const mutations = {
    auth_request(state) {
        state.error = null;
        state.status = 'loading'
    },
    auth_success(state, payload) {
        state.token = payload.token;
        state.user = payload.user.username;
        state.status = 'success'    
        state.error = null;
    },
    auth_error(state, err) {
        state.error = err.response.data.msg;
    },
    register_request(state) {
        state.error = null;
        state.status = 'loading'
    },
    register_success(state) {
        state.status = 'success'
        state.error = null;
    },
    register_error(state, err) {
        state.error = err.response.data.msg;
    },
    logout(state) {
        state.token = '';
        state.username = {};
        state.status =''
        state.error = null;
    },
};

export default {
    state,
    getters,
    actions, 
    mutations,
}