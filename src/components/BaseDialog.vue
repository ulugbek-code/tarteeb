<template>
  <teleport to="body">
    <div v-if="show" @click="$emit('close')"></div>
    <transition name="dialog">
      <dialog open v-if="show" :style="{ background: color, width: width }">
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
    </transition>
  </teleport>
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
    show: {
      required: true,
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
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 100;
}

/* dialog {
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
  overflow: hidden;
} */
dialog {
  position: fixed;
  top: 18vh;
  left: 30%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
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
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.35s ease;
}
</style>

@media (min-width: 768px) { dialog { left: calc(50% - 12rem); /* width: 40rem;
*/ } }
