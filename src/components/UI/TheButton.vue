<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  font-family: "Poppins", sans-serif;
  color: #fff;
  font-weight: 500;
  background: rgba(76, 175, 80, 1);
  transition: all 0.2s ease;
  padding: 4px 10px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
}
</style>
