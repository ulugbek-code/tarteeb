<template>
  <button
    @click="$emit('clicked')"
    :class="[green ? 'greeny' : '', red ? 'reddish' : '']"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["green", "red"],
};
</script>

<style scoped>
button {
  font-family: "Poppins", sans-serif;
  height: 26px;
  min-width: 80px;
  padding: 0 6px;
  color: #fff;
  background: rgba(67, 97, 238, 1);
  border: 1px solid rgba(67, 97, 238, 1);
  border-radius: 25px;
  outline: none;
  cursor: pointer;
  font-size: 11px;
  transition: 0.3s all ease;
}
.greeny {
  background: rgba(76, 175, 80, 1);
  border: 1px solid rgba(76, 175, 80, 1);
}
.reddish {
  background: rgba(165, 42, 42, 0.7);
  border: 1px solid rgba(165, 42, 42, 0.7);
}
button:hover {
  background: #fff;
  color: rgba(67, 97, 238, 1);
}
button.greeny:hover {
  color: rgba(76, 175, 80, 1);
}
button.reddish:hover {
  color: rgba(165, 42, 42, 0.7);
}
button:active {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
</style>
