<template>
  <div id="not-found-box">
    <h2>Whoops, that page is gone.</h2>
    <h1>404</h1>
    <router-link to="/"> to Tasks page</router-link>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
#not-found-box {
  width: 100%;
  height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
}
h2 {
  color: rgb(78, 73, 73);
}
h1 {
  font-size: 14rem;
  color: rgb(154, 145, 145);
}
a {
  text-decoration: none;
  color: rgba(99, 99, 98, 1);
  transition: 0.2s ease;
}
a:hover {
  color: rgba(99, 99, 98, 0.6);
}
</style>
