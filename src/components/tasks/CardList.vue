<template>
  <base-dialog v-if="isBtnClicked" color="#fff" width="680px" @close="close">
    <template #default>
      <form class="form-task">
        <h2>Edit the task</h2>
        <div class="parent">
          <div class="input-wrapper div1">
            <textarea rows="4" :placeholder="obj.description"></textarea>
          </div>
          <div class="div2">
            <base-dropdown
              :options="['Assignee', 'Task 2', 'Task 3', 'Task 4']"
              @input="getAssignee"
            ></base-dropdown>
          </div>
          <div class="div3">
            {{ date }}
            <input v-model="date" type="date" name="" id="" />
          </div>

          <div class="div4">
            <span id="reporter">Reporter</span>
            <base-dropdown
              :options="['John Doe', 'Task 2', 'Task 3', 'Task 4']"
              @input="getReporter"
            ></base-dropdown>
          </div>
          <div class="div5">
            <base-dropdown
              :options="listsName"
              @input="getStatus"
            ></base-dropdown>
          </div>
          <div class="div6">
            <p>Priority<span>*</span></p>
            <star-rating
              v-model:rating="rating"
              :star-size="25"
              :max-rating="3"
              :show-rating="false"
            ></star-rating>
          </div>
        </div>
      </form>
    </template>
    <template #actions>
      <div class="btn-wrapper">
        <the-button :green="true" class="form-btn">Save</the-button>
        <the-button :red="true" @click="close" class="form-btn"
          >Cancel</the-button
        >
      </div>
    </template>
  </base-dialog>
  <draggable :options="{ group: 'cardss' }" group="cardss" ghostClass="ghost">
    <div
      class="element-card"
      v-for="card in cardss"
      :key="card.id"
      @click="togglePopup(card.id)"
    >
      <p>{{ card.description }}</p>
      <div class="priority">
        <p>TT-{{ card.id }}</p>
        <star-rating
          :rating="card.priority"
          :star-size="15"
          :max-rating="3"
          :show-rating="false"
          :read-only="true"
        ></star-rating>
      </div>
    </div>
  </draggable>
</template>

<script>
import axios from "axios";
import { VueDraggableNext } from "vue-draggable-next";
import StarRating from "vue-star-rating";

export default {
  props: ["listId", "listName"],
  components: {
    draggable: VueDraggableNext,
    StarRating,
  },
  data() {
    return {
      isBtnClicked: false,
      rating: null,
      date: null,
      obj: {},
    };
  },
  methods: {
    getAssignee(val) {
      console.log(val);
    },
    getDate(val) {
      console.log(val);
    },
    getReporter(val) {
      console.log(val);
    },
    getStatus(val) {
      console.log(val);
    },
    async togglePopup(id) {
      const res = await axios.get(
        `https://time-tracker.azurewebsites.net/api/Tasks/${id}`
      );
      this.obj = res.data;
      console.log(this.obj);
      this.isBtnClicked = true;
      // const currentData = {
      //   listId: this.listId,
      //   listName: this.listName,
      //   id: data.id,
      //   name: data.description,
      // };
      // this.$store.dispatch("toggleOverlay");
      // this.$store.dispatch("openForm", currentData);
    },
    close() {
      this.isBtnClicked = false;
    },
  },
  computed: {
    cardss() {
      const cards = this.$store.getters["cardss"];
      return cards.filter((card) => {
        if (card.status.id === this.listId) {
          return true;
        } else {
          return false;
        }
      });
    },
    getLists() {
      return this.$store.getters["lists"];
    },
    listsName() {
      return this.getLists.map((list) => list.name);
    },
    // cards() {
    //   const cardFilteredByListId = this.$store.getters["cards"];
    //   return cardFilteredByListId.filter((card) => {
    //     if (card.listId === this.listId) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    overlayIsActive() {
      return this.$store.getters["overlay"];
    },
  },
  created() {
    this.$store.dispatch("getCards");
  },
  watch: {
    obj(val) {
      this.rating = val.priority;
    },
  },
};
</script>

<style scoped>
.element-card {
  position: relative;
  background-color: white;
  height: auto;

  padding: 10px;
  border-radius: 5px;
  min-height: 30px;
  margin-bottom: 10px;
  word-break: break-all;
  text-align: left;
  font-size: 15px;
  cursor: pointer;
}
.priority {
  display: flex;
  font-size: 12px;
  margin-top: 4px;
  justify-content: space-between;
}
.form-task {
  width: 100%;
  box-sizing: border-box;
}
.form-task * {
  font-family: "Poppins", sans-serif;
  color: #444;
}
.form-task textarea {
  width: 100%;
  background: #f2f3f6;
  border: none;
  padding: 1rem 0 0 1rem;
  outline: none;
}
.parent {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 48px);
  grid-column-gap: 12px;
  grid-row-gap: 8px;
}

.div1 {
  grid-area: 1 / 1 / 3 / 5;
}
.div2 {
  grid-area: 3 / 1 / 4 / 3;
}
.div3 {
  grid-area: 3 / 3 / 4 / 5;
}
.div3 input {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  font-size: 14px;
  line-height: 36px;
  background: #f2f3f6;
  border-radius: 25px;
  border: 1px solid rgba(67, 97, 238, 0.35);
  color: rgb(68, 68, 68);
  padding: 0 1rem;
}
.div4 {
  grid-area: 4 / 1 / 5 / 3;
  position: relative;
}
#reporter {
  position: absolute;
  z-index: 10;
  font-size: 12px;
  bottom: 92%;
}
.div5 {
  grid-area: 5 / 1 / 6 / 3;
}
.div6 {
  grid-area: 4 / 3 / 6 / 5;
  margin-left: 1rem;
}
.div6 span {
  color: rgb(175, 39, 39);
}
.btn-wrapper {
  width: 95%;
  display: flex;
  justify-content: flex-end;
}
.btn-wrapper button {
  margin-left: 1rem;
}
</style>
