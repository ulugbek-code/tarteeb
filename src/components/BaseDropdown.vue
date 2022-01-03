<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  // mounted() {
  //   this.$emit("input", this.selected);
  // },
};
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  font-size: 14px;
  line-height: 36px;
}

.custom-select .selected {
  background: #f2f3f6;
  border-radius: 25px;
  border: 1px solid rgba(67, 97, 238, 0.35);
  color: rgb(68, 68, 68);
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  /* border: 1px solid #ad8225; */
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 18px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: rgb(68, 68, 68) transparent transparent transparent;
}

.custom-select .items {
  color: rgb(68, 68, 68);
  border-radius: 0px 0px 6px 6px;
  /* overflow: hidden; */
  /* border-right: 1px solid #ad8225;
  border-left: 1px solid #ad8225;
  border-bottom: 1px solid #ad8225; */
  position: absolute;
  background-color: rgb(206, 203, 203);
  left: 0;
  right: 0;
  z-index: 100;
}

.custom-select .items div {
  color: rgb(68, 68, 68);
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: rgba(19, 23, 40, 0.4);
}

.selectHide {
  display: none;
}
</style>
