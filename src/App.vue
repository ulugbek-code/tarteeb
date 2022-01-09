<template>
  <the-navigation></the-navigation>
  <router-view></router-view>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";

export default {
  name: "App",
  components: {
    TheNavigation,
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
  /* font-size: 15px; */
  outline: none;
}
</style>
