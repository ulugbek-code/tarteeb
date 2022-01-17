<template>
  <div>
    <base-dialog :show="isBtnClicked" color="#fff" width="680px" @close="close">
      <template #default>
        <form @click="toggleInvalid" class="form-task">
          <h2>Add new task</h2>
          <div class="parent">
            <div class="input-wrapper div1">
              <textarea
                v-model="desc"
                rows="4"
                placeholder="Task description goes here..."
              ></textarea>
            </div>
            <div class="div2">
              <base-dropdown
                :options="usersNames"
                :withObj="true"
                default="Assignee here..."
                @input="getAssignee"
              ></base-dropdown>
            </div>
            <div class="div3">
              <input v-model="newDate" type="date" name="" id="" />
            </div>
            <div class="div4">
              <base-dropdown
                :options="usersNames"
                :withObj="true"
                default="Reporter here..."
                @input="getReporter"
              ></base-dropdown>
            </div>
            <div class="div5">
              <base-dropdown
                :options="statusNames"
                default="Status..."
                @input="getStatus"
              ></base-dropdown>
            </div>
            <div class="div6">
              <p>Priority<span>*</span></p>
              <star-rating
                v-model:rating="newRating"
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
          <small v-if="isInvalid">Please fill all required fields!</small>
          <the-button @click="addTask" :green="true" class="form-btn"
            >Add</the-button
          >
          <the-button :red="true" @click="close" class="form-btn"
            >Cancel</the-button
          >
        </div>
      </template>
    </base-dialog>
    <!-- error modal -->
    <base-dialog :show="isError" color="#fff" width="480px" @close="closeError">
      <template #default>
        <div class="form-task">
          <h3>Oops! Something went wrong! Please, contact the developers...</h3>
        </div>
      </template>
      <template #actions>
        <div class="btn-wrapper">
          <the-button @click="closeError" class="form-btn">Close</the-button>
        </div>
      </template>
    </base-dialog>
    <the-navigation></the-navigation>
    <header :class="[!isNavOpened ? 'nav' : '']" class="box">
      <h2>Tasks</h2>
      <div class="flex">
        <div class="search-input">
          <img src="../assets/search.png" alt="" />
          <input v-model="search" type="text" placeholder="Search..." />
        </div>
        <div class="box-header">
          <button @click="isBtnClicked = !isBtnClicked">Add Task</button>
        </div>
      </div>
    </header>
    <main :class="[!isNavOpened ? 'nav' : '']" class="list-container">
      <!-- <overlay-task></overlay-task>
      <popup-task></popup-task> -->
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
            <Board :search="search" :id="list.id" :name="list.name" />
          </div>
        </draggable>
        <div v-if="!isAddClicked" class="plus">
          <span @click="toggleAddBtn">+</span>
        </div>
        <input
          v-else
          v-focus
          type="text"
          class="input-new-list"
          placeholder="Create a List..."
          v-model="listName"
          @keyup.enter="createList"
        />
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { VueDraggableNext } from "vue-draggable-next";
import StarRating from "vue-star-rating";
import Board from "../components/tasks/Board.vue";
// import OverlayTask from "../components/tasks/OverlayTask.vue";
// import PopupTask from "../components/tasks/PopupTask.vue";
import BaseDropdown from "../components/BaseDropdown.vue";
import focusInput from "../directives/focusInput";

export default {
  components: {
    draggable: VueDraggableNext,
    StarRating,
    Board,
    // PopupTask,
    // OverlayTask,
    BaseDropdown,
  },
  directives: {
    focus: focusInput,
  },
  data() {
    return {
      id: null, //to send id and new order below
      newOrder: null,
      isAddClicked: false,
      isBtnClicked: false,
      isInvalid: false,
      isError: false,
      listName: "",
      desc: null,
      newRating: 1,
      newAssignee: null,
      newReporter: null,
      newStatus: null,
      newDate: null,
      search: "",
    };
  },
  computed: {
    myLists: {
      get() {
        return this.$store.getters["lists"];
      },
      async set() {
        // this.$store.dispatch("updateBoard", value);
        try {
          this.$Progress.start();
          await axios.post(
            "https://time-tracker.azurewebsites.net/api/Boards/ChangeOrder",
            {
              id: this.id,
              newOrder: this.newOrder,
            }
          );
          await this.$store.dispatch("getLists");
          this.$Progress.finish();
        } catch (e) {
          this.$Progress.fail();
          this.isError = true;
        }
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
    users() {
      return this.$store.getters["users"];
    },
    getLoginUser() {
      let login = JSON.parse(localStorage.getItem("decodedToken"));
      let login2 = {
        id: parseInt(login.nameid),
        firstName: login.given_name,
        lastName: login.unique_name,
      };
      return login2;
    },
    usersNames() {
      // return this.users.map((user) => `${user.firstName} ${user.lastName}`);
      let users = this.$store.getters["users"].map((user) =>
        JSON.parse(JSON.stringify(user))
      );
      let finalUsers = [...users, this.getLoginUser];
      // console.log(finalUsers);
      return finalUsers;
    },
    statusNames() {
      return this.lists.map((list) => list.name);
    },
  },
  methods: {
    closeError() {
      this.isError = false;
    },
    toggleAddBtn() {
      this.isAddClicked = true;
    },
    getAssignee(val) {
      this.newAssignee = val;
    },
    getReporter(val) {
      this.newReporter = val;
    },
    getStatus(val) {
      const i = this.lists
        .filter((list) => list.name === val)
        .map((list) => list.id);
      this.newStatus = i[0];
    },
    async createList() {
      if (this.listName !== "") {
        // this.$store.dispatch("createList", this.listName);
        try {
          this.$Progress.start();
          await axios.post(
            "https://time-tracker.azurewebsites.net/api/Boards",
            {
              name: this.listName,
              order: this.getMaxOrder,
            }
          );
          this.$store.dispatch("getLists");
          this.$Progress.finish();
          this.isAddClicked = false;
          this.listName = "";
        } catch (e) {
          this.$Progress.fail();
          this.isError = true;
        }
      }
    },
    checkMove(evt) {
      // this.$store.dispatch("getMove", evt);
      this.id = evt.draggedContext.element.id;
      this.newOrder = evt.relatedContext.element.order;
      // console.log("Future index: " + evt.draggedContext.futureIndex);
      // console.log("element: " + evt.draggedContext.element.name);
    },
    async addTask() {
      if (
        this.desc &&
        this.newAssignee &&
        this.newReporter &&
        this.newStatus &&
        this.newDate
      ) {
        try {
          this.$Progress.start();
          await axios.post("https://time-tracker.azurewebsites.net/api/Tasks", {
            description: this.desc,
            priority: this.newRating,
            deadline: this.newDate + "T00:00:00",
            createdBy: this.$store.getters.loginUser.id,
            statusId: this.newStatus,
            userId: this.newAssignee,
            reporterId: this.newReporter,
          });
          await this.$store.dispatch("getCards");
          this.$Progress.finish();
          this.close();
        } catch (err) {
          this.isBtnClicked = false;
          this.$Progress.fail();
          this.isError = true;
        }
      } else {
        this.isInvalid = true;
      }
    },
    toggleInvalid() {
      this.isInvalid = false;
    },
    close() {
      (this.desc = null),
        (this.newRating = 1),
        (this.newAssignee = null),
        (this.newReporter = null),
        (this.newStatus = null),
        (this.newDate = null);
      this.isBtnClicked = false;
      this.toggleInvalid();
    },
  },
  mounted() {
    this.$Progress.finish();
  },
  created() {
    this.$Progress.start();
    this.$store.dispatch("getLists");
    this.$store.dispatch("getUsers");
  },
};
</script>

<style scoped>
.load {
  margin-left: 400px;
}
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
.div3 input {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  font-size: 14px;
  line-height: 34px;
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
  align-items: center;
}
.btn-wrapper small {
  color: rgb(193, 58, 58);
  width: 100%;
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
  color: rgba(24, 43, 77, 1);
  font-family: "Poppins", sans-serif;
  min-width: 260px;
}
.input-new-list::placeholder {
  color: rgba(68, 68, 68, 0.8);
}
.list-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
}
.plus {
  width: 36px;
  text-align: center;
  cursor: pointer;
  /* background: transparent;
  box-shadow: 2px -0.5px 2px 1px #dddfe0; */
}
.plus span {
  background: #f2f3f6;
  font-size: 24px;
  padding: 2px 12px;
  color: rgba(24, 43, 77, 1);
  border-radius: 4px;
  transition: all 0.2s ease;
}
.plus span:hover {
  background: #dddfe0;
}
</style>
