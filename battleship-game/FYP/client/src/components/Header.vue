<template>
  <header>
    <nav>
      <router-link class="nav-child title" to="/">Battleship</router-link>
      <router-link class="nav-child" to="/play">Play</router-link>
      <router-link class="nav-child" to="/learn">Learn</router-link>
      <router-link class="nav-child" to="/about">About</router-link>
    </nav>

    <div class="buttons">
      <router-link v-if="!isLoggedIn" class="nav-child" to="/login">Sign In</router-link>
      <router-link v-if="isLoggedIn" class="nav-child" to="/profile">{{ user }}</router-link>
      <a title="Logout" v-if="isLoggedIn" class="nav-child" @click.prevent="logoutUser">🚪</a>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";


export default {
  name: "Header",
  computed: {
    ...mapGetters(['isLoggedIn', 'user']),
  },
  methods: {
    ...mapActions(["logout", "logoutAndSave"]),
    logoutUser() {
      if (localStorage.getItem('gameState') === null) {
        this.logout()
      } else {
        let savedGame = JSON.parse(localStorage.getItem('gameState'))
        this.logoutAndSave(savedGame);
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.nav-child:visited,
.nav-child:link,
.router-link-active,
.router-link-exact-active,
a {
  color: black;
  font-size: 1.5em;
  text-decoration: none;
}
a:hover {
  cursor: pointer;
}
.nav-child:hover {
  color: blue;
}
header {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  user-select: none;
  border: 1px solid lightslategray;
  padding: 1% 0;
  min-width: 880px;
}

nav {
  flex: 2 1 auto;
  display: flex;
  padding-right: 40%;
}
.nav-child {
  margin: auto;
}
a.nav-child.title {
  font-size: 2em;
}
.buttons {
  flex: 1 1 auto;
  display: flex;
}
</style>