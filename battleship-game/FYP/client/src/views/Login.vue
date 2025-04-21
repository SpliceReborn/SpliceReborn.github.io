<template>
    <div>
        <Header />
        <div class="container">
            <div class="inner-container">
                <h2>Login</h2>
                <form @submit.prevent="logInUser" class="form">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input id="username" type="text" placeholder="Username" 
                                name="username" v-model="username" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input id="password" type="password" placeholder="Password" 
                                name="password" v-model="password" class="form-control">
                    </div>
                    <Errors v-if="error" :msg="error" />
                    <input type="submit" value="Login" class="btn"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <router-link to="/register">Register</router-link>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Errors from '@/components/Errors.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        Header,
        Errors,
    },
    data() {
        return {
            username: "",
            password: ""
        }
    },
    computed: {
        ...mapGetters(["error"])
    },
    methods: {
        ...mapActions(['login', 'retrieveGame']),
        logInUser() {
            let user = {
                username: this.username,
                password: this.password
            };
            this.login(user).then(res => {
                if (res.data.success) {
                    this.$router.push('/profile');
                }
            }).catch(err => {
                console.log(err);
            })
            this.retrieveGame(user).then(res => {
                if (res.data.gameState !== {}) {
                    res.data.gameState.username = user.username
                    localStorage.setItem('gameState', JSON.stringify(res.data.gameState))
                }
            })
        }
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.container {
    width:30%;
    min-width:500px;
    margin: 7% auto;
    background-color: whitesmoke;
    border-style:double;
    border-width: 1px;
}
h2 {
    font-size: 2.5em;
    text-align: left;
    margin-bottom: 1em;
}
.inner-container {
    margin: 5% 15%;
}
.form {
    margin-top: 40px;
    border-radius: 6px;
    width: 100%;
    margin: auto;
}
.form-group {
    margin-bottom: 2rem;
}
label {
    display: inline-block;
    width: 100%;
    text-align: left;
    margin-bottom: 1%;
    font-weight: bold;
}
.form-control:invalid, .form-group.is-invalid .form-control {
    border-color: #c33;
}
.form-control {
    display: block;
    width: 100%;
    height: calc(2.7em + 2px);
    background-clip: padding-box;
    padding-left: 3%;
}
.btn {
    display: block;
    width: 100%;
    padding: 20px;
    font-family: "Roboto";
    outline: 0;
    border: 0;
    color: white;
    background: rgba(0, 157, 196, 0.7);
    margin-bottom: 1em;
}
.btn:hover{
    background-color:rgba(0, 157, 196, 1);
    cursor: pointer;
}
.form a {
    width: 100%;
    display:inline-block;
}
a:visited {
    text-decoration: none;
    color: rgb(0, 102, 204)
}
</style>




