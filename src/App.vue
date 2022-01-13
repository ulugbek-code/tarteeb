<template>
  <vue-progress-bar></vue-progress-bar>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
export default {
  name: "App",
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
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.35s ease-out;
}
.route-leave-active {
  transition: all 0.35s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
