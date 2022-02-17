<template>
  <vue-progress-bar></vue-progress-bar>
  <transition name="nav" mode="out-in">
    <the-navigation v-if="isAuth || loginUser"></the-navigation>
  </transition>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
export default {
  name: "App",
  computed: {
    isAuth() {
      return this.$store.getters.getAuth;
    },
    loginUser() {
      return this.$store.state.loginUser;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  font-family: "Poppins", sans-serif;
}
input {
  border: none;
  outline: none;
}
/* width */
::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #eeeeee;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #cecdcd;
  border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(187, 183, 183);
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to,
.nav-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.2s ease-out;
}
.route-leave-active,
.nav-leave-active {
  transition: all 0.2s ease-in;
}
.route-enter-to,
.route-leave-from,
.nav-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
