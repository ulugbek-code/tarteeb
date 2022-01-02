<template>
  <base-dialog
    v-if="isBtnClicked"
    title="Register new user"
    color="#1a1e33"
    @close="close"
  >
    <template #default>
      <div>
        <form class="form-reg">
          <div class="input-container">
            <input v-model.trim="firstName" type="text" required />
            <span>Firstname</span>
          </div>
          <div class="input-container">
            <input v-model.trim="lastName" type="text" required />
            <span>Lastname</span>
          </div>
          <div class="input-container">
            <input v-model.trim="phoneNumber" type="tel" required />
            <span>Phone number</span>
          </div>
          <div class="input-container">
            <input
              v-model.trim="dateOfBirth"
              class="date"
              type="date"
              required
            />
            <!-- <span>Date of birth</span> -->
          </div>
        </form>
      </div>
    </template>
    <template #actions>
      <button class="form-btn">Register</button>
      <button @click="close" class="form-btn">Cancel</button>
    </template>
  </base-dialog>
  <header>
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
  <main class="list-container">
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
import CardsList from "../components/tasks/CardList.vue";
import CardTask from "../components/tasks/CardTask.vue";
import OverlayTask from "../components/tasks/OverlayTask.vue";
import PopupTask from "../components/tasks/PopupTask.vue";

export default {
  components: {
    draggable: VueDraggableNext,
    CardsList,
    CardTask,
    PopupTask,
    OverlayTask,
  },
  data() {
    return {
      isBtnClicked: false,
      listName: "",
    };
  },
  methods: {
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
  },
};
</script>

<style scoped>
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
  z-index: 90;
  margin-left: 270px;
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
