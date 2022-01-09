<template>
  <base-dialog v-if="isBtnClicked" color="#fff" width="680px" @close="close">
    <template #default>
      <form class="form-task">
        <h2>Add new task</h2>
        <div class="parent">
          <div class="input-wrapper div1">
            <textarea
              rows="4"
              placeholder="Task description goes here..."
            ></textarea>
          </div>
          <div class="div2">
            <base-dropdown
              :options="['Assignee', 'Task 2', 'Task 3', 'Task 4']"
              @input="getOption"
            ></base-dropdown>
          </div>
          <div class="div3">
            <base-dropdown
              :options="[
                'Expected delivery date',
                'Task 2',
                'Task 3',
                'Task 4',
              ]"
              @input="getOption"
            ></base-dropdown>
          </div>

          <div class="div4">
            <span id="reporter">Reporter</span>
            <base-dropdown
              :options="['John Doe', 'Task 2', 'Task 3', 'Task 4']"
              @input="getOption"
            ></base-dropdown>
          </div>
          <div class="div5">
            <base-dropdown
              :options="['Status', 'Task 2', 'Task 3', 'Task 4']"
              @input="getOption"
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
  <header :class="[!isNavOpened ? 'nav' : '']" class="box">
    <h2>Tasks</h2>
    <div class="flex">
      <div class="search-input">
        <img src="../assets/search.png" alt="" />
        <input type="text" placeholder="Search..." />
      </div>
      <div class="box-header">
        <button @click="isBtnClicked = !isBtnClicked">Add Task</button>
      </div>
    </div>
  </header>
  <main :class="[!isNavOpened ? 'nav' : '']" class="list-container">
    <overlay-task></overlay-task>
    <popup-task></popup-task>
    <h1 v-if="isLoading">Loading...</h1>
    <section class="list-wrapper">
      <draggable
        :options="{ group: 'lists' }"
        group="lists"
        ghostClass="ghost"
        class="list-draggable"
        :move="checkMove"
        v-model="myLists"
      >
        <div class="list-card" v-for="list in lists" :key="list.id">
          <Board :id="list.id" :name="list.name" />
        </div>
      </draggable>
      <input
        type="text"
        class="input-new-list"
        placeholder="Create a List"
        v-model="listName"
        @keyup.enter="createList"
      />
    </section>
  </main>
</template>

<script>
import axios from "axios";
import { VueDraggableNext } from "vue-draggable-next";
import StarRating from "vue-star-rating";
import Board from "../components/tasks/Board.vue";
import OverlayTask from "../components/tasks/OverlayTask.vue";
import PopupTask from "../components/tasks/PopupTask.vue";
import BaseDropdown from "../components/BaseDropdown.vue";

export default {
  components: {
    draggable: VueDraggableNext,
    StarRating,
    Board,
    PopupTask,
    OverlayTask,
    BaseDropdown,
  },
  data() {
    return {
      id: null, //to send id and new order below
      newOrder: null,
      isBtnClicked: false,
      listName: "",
      rating: null,
      isLoading: false,
    };
  },
  computed: {
    myLists: {
      get() {
        return this.$store.getters["lists"];
      },
      async set() {
        this.isLoading = true;
        // this.$store.dispatch("updateBoard", value);
        await axios.post(
          "https://time-tracker.azurewebsites.net/api/Boards/ChangeOrder",
          {
            id: this.id,
            newOrder: this.newOrder,
          }
        );
        this.$store.dispatch("getLists");
        this.isLoading = false;
      },
    },
    lists() {
      return this.$store.getters["lists"];
    },
    isNavOpened() {
      return this.$store.getters.isNavOpened;
    },
    getMaxOrder() {
      return this.$store.getters.getMaxOrder;
    },
  },
  methods: {
    getOption(opt) {
      console.log(opt);
    },
    async createList() {
      if (this.listName !== "") {
        // this.$store.dispatch("createList", this.listName);
        await axios.post("https://time-tracker.azurewebsites.net/api/Boards", {
          name: this.listName,
          order: this.getMaxOrder,
        });
        this.$store.dispatch("getLists");
        this.listName = "";
      }
    },
    checkMove(evt) {
      // this.$store.dispatch("getMove", evt);
      this.id = evt.draggedContext.element.id;
      this.newOrder = evt.relatedContext.element.order;
      // console.log("Future index: " + evt.draggedContext.futureIndex);
      // console.log("element: " + evt.draggedContext.element.name);
    },
    close() {
      this.isBtnClicked = false;
    },
  },
  created() {
    this.$store.dispatch("getLists");
    this.$store.dispatch("getUsers");
  },
};
</script>

<style scoped>
.box {
  transition: all 0.4s ease;
}
.box.nav,
.list-container.nav {
  margin-left: 110px;
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
header {
  margin-left: 270px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 16px 12px 24px;
}
.flex {
  display: flex;
}
.search-input {
  position: relative;
  margin-right: 1rem;
}
.search-input img {
  position: absolute;
  left: 3%;
  top: 7px;

  height: 16px;
}
.search-input input {
  width: 100%;
  padding: 4px 32px;
  border: 0.5px solid rgba(67, 97, 238, 0.35);
  border-radius: 50px;
  outline: rgba(67, 97, 238, 1);
  color: rgba(85, 85, 85, 1);
  font-family: "Poppins", "sans-serif";
  transition: all 0.4s ease;
}
.search-input input:hover {
  border: 0.5px solid rgba(67, 97, 238, 1);
}
.box-header button {
  font-family: "Poppins", sans-serif;
  color: #fff;
  font-weight: 500;
  background: rgba(67, 97, 238, 1);
  transition: all 0.2s ease;
  padding: 4px 10px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
}
.box-header button:hover {
  background: rgba(67, 97, 238, 0.8);
}
.list-container {
  position: relative;
  display: flex;
  /* width: 100vw;*/
  height: 88vh;
  border: 1px;
  z-index: 10;
  margin-left: 270px;
  transition: all 0.4s ease;
  /* overflow-x: hidden; */
  /* margin-left: 270px; */
}

.list-wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  /* min-width: 100vw;
  height: 100vh; */
  padding: 20px;
  gap: 20px;
  overflow-x: scroll;
  overflow-y: hidden;
}

.ghost {
  opacity: 0.5;
}

.list-draggable {
  display: flex;
  gap: 20px;
}

.input-new-list {
  display: flex;
  height: 30px;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(235, 236, 240, 0.5);
  width: 260px;
}

.input-new-list::placeholder {
  color: #444;
  font-family: "Poppins", sans-serif;
}

.list-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
}
</style>
