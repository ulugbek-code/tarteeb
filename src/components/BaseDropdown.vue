<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <template v-if="!withObj">
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
      </template>
      <template v-else>
        <div
          v-for="option of options"
          :key="option.id"
          @click="sendData(option)"
        >
          {{ `${option.firstName} ${option.lastName}` }}
        </div>
      </template>
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
    defaultVal: {
      required: false,
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
    withObj: {
      required: false,
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
  methods: {
    sendData(option) {
      this.selected = `${option.firstName} ${option.lastName}`;
      this.open = false;
      this.$emit("input", option.id);
    },
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
  max-height: 14rem;
  overflow-y: scroll;
  color: rgb(68, 68, 68);
  border-radius: 0px 0px 6px 6px;
  position: absolute;
  background-color: rgb(241, 232, 232);
  left: 0;
  right: 0;
  z-index: 100;
}
::-webkit-scrollbar {
  display: none;
}
.custom-select .items div {
  color: rgb(68, 68, 68);
  border-top: 0.1px solid rgba(68, 68, 68, 0.1);
  padding-left: 1em;
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: rgba(19, 23, 40, 0.1);
}

.selectHide {
  display: none;
}
</style>
