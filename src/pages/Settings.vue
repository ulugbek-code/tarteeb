<template>
  <the-navigation></the-navigation>
  <div :class="[!isNavOpened ? 'nav' : '']" class="settings">
    <h1>Settings</h1>
  </div>
</template>

<script>
export default {
  computed: {
    isNavOpened() {
      return this.$store.getters.isNavOpened;
    },
  },
};
</script>

<style scoped>
.settings {
  margin-left: 300px;
  transition: all 0.4s ease;
}
.settings.nav {
  margin-left: 130px;
}
</style>
