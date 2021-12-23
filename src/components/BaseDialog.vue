<template>
  <div @click="$emit('close')"></div>
  <dialog open :style="{ background: color }">
    <header>
      <slot name="header">
        <h2>{{ title }}</h2>
      </slot>
    </header>
    <section>
      <slot></slot>
    </section>
    <ul>
      <slot name="actions"> </slot>
    </ul>
  </dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    color: {
      type: String,
    },
  },
  emits: ["close"],
};
</script>

<style scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 24%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
}

header {
  background-color: rgba(0, 0, 0, 0.2);
  text-align: center;
  color: white;
  width: 100%;
  padding: 1rem;
}
header h2 {
  margin: 0;
}
section {
  padding: 1.2rem 1rem 1rem;
  /* padding-top: 2rem; */
  display: flex;
  justify-content: center;
  align-items: center;
}
ul {
  padding: 1rem;
  display: flex;
  justify-content: center;
  margin: 0;
}
button {
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 12rem);
    /* width: 40rem; */
  }
}
</style>
