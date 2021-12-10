<template>
  <div @click="$emit('close')"></div>
  <dialog open>
    <header :class="color">
      <slot name="header">
        <h2>{{ title }}</h2>
      </slot>
    </header>
    <section>
      <span>
        <slot></slot>
      </span>
    </section>
    <ul>
      <slot name="actions">
        <button @click="$emit('close')">Close</button>
      </slot>
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
  left: 1 0%;
  width: 20%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
}

header {
  color: white;
  width: 100%;
  padding: 1rem;
}
header.green {
  background: #6ecb63;
}
header.red {
  background-color: #ff5c58;
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
  justify-content: flex-end;
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
    left: calc(50% - 10rem);
    /* width: 40rem; */
  }
}
</style>
