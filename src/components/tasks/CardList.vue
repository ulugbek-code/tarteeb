<template>
  <draggable :options="{ group: 'cards' }" group="cards" ghostClass="ghost">
    <span
      class="element-card"
      v-for="(card, index) in cards"
      :key="index"
      @click="togglePopup(card)"
    >
      {{ card.name }}
    </span>
  </draggable>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";

export default {
  props: ["listId", "listName"],
  components: {
    draggable: VueDraggableNext,
  },
  methods: {
    togglePopup(data) {
      const currentData = {
        listId: this.listId,
        listName: this.listName,
        id: data.id,
        name: data.name,
      };
      this.$store.dispatch("toggleOverlay");
      this.$store.dispatch("openForm", currentData);
    },
  },
  computed: {
    cards() {
      const cardFilteredByListId = this.$store.getters["cards"];
      return cardFilteredByListId.filter((card) => {
        if (card.listId === this.listId) {
          return true;
        } else {
          return false;
        }
      });
    },
    overlayIsActive() {
      return this.$store.getters["overlay"];
    },
  },
};
</script>

<style scoped>
.element-card {
  position: relative;
  background-color: white;
  height: auto;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  min-height: 30px;
  margin-bottom: 10px;
  word-break: break-all;
  text-align: left;
  cursor: pointer;
}
</style>
