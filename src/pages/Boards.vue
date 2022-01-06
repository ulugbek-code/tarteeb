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
    <section class="list-wrapper">
      <draggable
        :options="{ group: 'lists' }"
        group="lists"
        ghostClass="ghost"
        class="list-draggable"
      >
        <div class="list-card" v-for="(list, index) in lists" :key="index">
          <label class="list-header">{{ list.name }}</label>
          <div class="list-content">
            <CardsList :listId="list.id" :listName="list.name" />
          </div>
          <div class="list-footer">
            <card-task :listId="list.id"></card-task>
          </div>
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
import { VueDraggableNext } from "vue-draggable-next";
import StarRating from "vue-star-rating";
import CardsList from "../components/tasks/CardList.vue";
import CardTask from "../components/tasks/CardTask.vue";
import OverlayTask from "../components/tasks/OverlayTask.vue";
import PopupTask from "../components/tasks/PopupTask.vue";
import BaseDropdown from "../components/BaseDropdown.vue";

export default {
  components: {
    draggable: VueDraggableNext,
    StarRating,
    CardsList,
    CardTask,
    PopupTask,
    OverlayTask,
    BaseDropdown,
  },
  data() {
    return {
      isBtnClicked: false,
      listName: "",
      rating: null,
    };
  },
  methods: {
    getOption(opt) {
      console.log(opt);
    },
    createList() {
      if (this.listName !== "") {
        this.$store.dispatch("createList", this.listName);
        this.listName = "";
      }
    },
    close() {
      this.isBtnClicked = false;
    },
  },
  computed: {
    lists() {
      return this.$store.getters["lists"];
    },
    isNavOpened() {
      return this.$store.getters.isNavOpened;
    },
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
  color: rgb(20, 20, 20);
}

.list-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
}

.list-header {
  position: relative;
  display: flex;
  justify-content: center;
  word-break: break-all;
  align-items: center;
  min-width: 280px;
  max-width: 280px;
  line-height: 50px;
  padding: 0px 10px 0px 10px;
  background-color: rgba(235, 236, 240, 1);
  border-radius: 10px 10px 0px 0px;
  color: rgba(24, 43, 77, 1);
  user-select: none;
  cursor: pointer;
}

.list-content {
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 280px;
  max-width: 280px;
  height: auto;
  background-color: rgba(235, 236, 240, 1);
  padding: 0px 10px 0px 10px;
  box-shadow: 1.5px 1.5px 1.5px 0.1px rgba(255, 255, 255, 0.1);
  color: rgba(24, 43, 77, 1);
}

.list-footer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  background-color: rgba(235, 236, 240, 1);
  border-radius: 0px 0px 10px 10px;
  color: white;
  border-top: 0.5px solid rgba(255, 255, 255, 0.25);
  padding: 0px 10px 10px 10px;
}
</style>
