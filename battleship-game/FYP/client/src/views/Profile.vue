<template>
    <div>
        <Header />
        <div class="info-container">
            <div class="info-inner-container">
                <h2> {{user}} </h2>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import {mapGetters} from 'vuex'

export default {
    components: {
        Header,
    },
    computed: {
        ...mapGetters(['user']),
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.info-container {
    width:70%;
    min-width:500px;
    margin: 3% auto;
    background-color: whitesmoke;
    border-style:double;
    border-width: 1px;
}
h2 {
    font-size: 2.5em;
    text-align: left;
    margin-bottom: 1em;
}
.info-inner-container {
    margin: 3% 5%;
}
.info-inner-container p {
    text-align:left;
    margin-bottom: 1em;
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
}
.btn {
    display: block;
    width: 100%;
    padding: 20px;
    font-family: "Roboto";
    outline: 0;
    border: 0;
    color: white;
    background: burlywood;
    margin-bottom: 1em;
}
.form a {
    width: 100%;
    display:inline-block;
}
</style>