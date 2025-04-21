<template>
    <div>
        <Header />
        <div class="container">
            <div class ="inner-container">
                <h2>Register</h2>
                <form @submit.prevent="registerUser" class="form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input id="email" type="email" placeholder="Email" 
                                email="email" v-model="email" class="form-control">
                    </div>
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
                    <div class="form-group">
                        <label for="confirm_password">Confirm Password</label>
                        <input id="confirm_password" type="password" placeholder="Confirm Password" 
                                name="confirm_password" v-model="confirm_password" class="form-control">
                    </div>
                    <Errors v-if="error" :msg="error" />
                    <input type="submit" value="Register" class="btn" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <router-link to="/login">Already have an account?</router-link>
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
            password: "",
            email: "",
            confirm_password: "",
            name: ""
        }
    },
    computed: {
        ...mapGetters(["error"])
    },
    methods: {
        ...mapActions(["register"]),
        registerUser() {
            let user = {
                username: this.username,
                email: this.email,
                password: this.password,
                confirm_password: this.confirm_password,
            }
            this.register(user).then(res => {
                if (res.data.success) {
                    this.$router.push('/profile');
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
    background:rgba(0, 157, 196, 0.7);
    margin-bottom: 1em;
}
.btn:hover{
    cursor: pointer;
    background-color: rgba(0, 157, 196, 1);
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