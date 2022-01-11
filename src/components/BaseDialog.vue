<template>
  <div @click="$emit('close')"></div>
  <dialog open :style="{ background: color, width: width }">
    <header v-if="title">
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
    width: {
      required: false,
    },
    isOpen: {
      required: false,
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
  z-index: 100;
}

dialog {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  width: 24%;
  z-index: 200;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  background: hsla(0, 0%, 86%, 1);
  /* overflow: hidden; */
}

header {
  text-align: center;
  color: #444;
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
</style>

@media (min-width: 768px) { dialog { left: calc(50% - 12rem); /* width: 40rem;
*/ } }
