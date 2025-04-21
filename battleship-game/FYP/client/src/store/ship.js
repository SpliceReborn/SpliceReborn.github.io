import axios from 'axios';
// import router from '../router/index'

const state = {
    gameOver: false,
    saved: false,
};
const getters = {/* 
    isLoggedIn: state => !!state.token, // !! casts variable to boolean
    authState: state => state.status,
    user: state => state.user, */
    isGameOver: state => state.gameOver,
};
const actions = {
    async startGame({commit}) {
        commit('startGame')
    },
    async endGame({commit}, gameData) {
        commit('endGame')
        if (localStorage.getItem('username') !== null) {
            let res = await axios.post('http://localhost:5000/api/games/save', gameData)
            return res
        }
    },
    async saveGame({commit}, gameData) {
        commit('saveGame')
        let res = await axios.post('http://localhost:5000/api/games/saveUnfinished', gameData)
        return res  
    },
    async retrieveGame({commit}, user) {
        commit('retrieveGame')
        let res = await axios.get('http://localhost:5000/api/games/loadUnfinished', {
            params: {
                username: user.username
            }
        })
        return res
    }
     
};
const mutations = {
    startGame(state) {
        state.gameOver = false
    },
    endGame(state) {
        state.gameOver = true
    },
    retrieveGame(state) {
        // could use this to see if there is saved file in localStorage?
        state.saved = true
    }
};

export default {
    state,
    getters,
    actions, 
    mutations,
}