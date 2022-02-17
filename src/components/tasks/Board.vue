<template>
  <base-dialog :show="openDelete" color="#fff" width="480px" @close="close">
    <template #default>
      <form class="form-task">
        <h4>
          Moving tasks from the
          <strong>&lt;&lt;{{ name }}&gt;&gt;</strong> column
        </h4>
        <p>
          Select a new location for all tasks with a
          <strong>&lt;&lt;{{ name }}&gt;&gt;</strong> status, including jobs in
          the backlog.
        </p>
        <div class="flex">
          <div class="first-board">
            <p>This status will be removed:</p>
            <p>{{ name }}</p>
          </div>
          <div class="second-board">
            <template v-if="getBoardsNames.length">
              <p>New task layout:</p>
              <span><img src="../../assets/next.png" alt="" /></span>
              <base-dropdown
                :options="getBoardsNames"
                @input="getInput"
              ></base-dropdown>
            </template>
            <div v-else>
              <p>No other columns have</p>
              <img src="../../assets/none.png" alt="" />
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #actions>
      <div class="btn-wrapper">
        <the-button
          v-if="getBoardsNames.length"
          @click="deleteBoard"
          :red="true"
          class="form-btn"
          >Delete</the-button
        >
        <the-button @click="close" class="form-btn">Cancel</the-button>
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
  <div class="list-body">
    <div class="list-header">
      <label v-if="isLabel" @dblclick="changeLabel">{{ name }}</label>
      <span @click.stop="clickDots" id="three-dots">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="three-dots"
          fill="#364a6e"
          x="0px"
          y="0px"
          width="22px"
          height="16px"
          viewBox="0 0 122.88 1"
        >
          <g>
            <path
              d="M122.88,14.978c0,8.271-6.708,14.979-14.979,14.979s-14.976-6.708-14.976-14.979 C92.926,6.708,99.631,0,107.901,0S122.88,6.708,122.88,14.978L122.88,14.978z M29.954,14.978c0,8.271-6.708,14.979-14.979,14.979 S0,23.248,0,14.978C0,6.708,6.705,0,14.976,0S29.954,6.708,29.954,14.978L29.954,14.978z M76.417,14.978 c0,8.271-6.708,14.979-14.979,14.979c-8.27,0-14.978-6.708-14.978-14.979C46.46,6.708,53.168,0,61.438,0 C69.709,0,76.417,6.708,76.417,14.978L76.417,14.978z"
            />
          </g>
        </svg>
      </span>
      <input
        v-if="!isLabel"
        @dblclick="changeLabel"
        @keyup.enter="changeLabelName"
        type="text"
        class="label-name"
        v-model="labelName"
        placeholder="New status name here ..."
        v-focus
      />
      <transition name="fade">
        <div
          v-if="openFilter"
          tabindex="0"
          @blur="openFilter = false"
          class="board-filter"
        >
          <small @click="openFilter = false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon-tabler"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2c3e50"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="13" y1="18" x2="19" y2="12" />
              <line x1="13" y1="6" x2="19" y2="12" />
            </svg>
          </small>
          <small @click="sortingArr('a')"
            ><img src="../../assets/a-z.png" alt="" /> A-Z</small
          >
          <small @click="sortingArr('z')"
            ><img src="../../assets/z-a.png" alt="" /> Z-A</small
          >
          <small @click="sortingArr('p')"
            ><img src="../../assets/star.png" alt="" /> By priority</small
          >
          <small @click="changeLabel"
            ><img src="../../assets/edit-title.svg" alt="" /> Edit the
            name</small
          >
          <small @click="openDelete = true"
            ><img src="../../assets/trash.svg" alt="" /> Delete</small
          >
        </div>
      </transition>
    </div>
    <div class="list-content">
      <CardsList
        :listId="id"
        :listName="name"
        :searchInput="search"
        :sortBy="sortBy"
      />
    </div>
    <div class="list-footer">
      <card-task :listId="id"></card-task>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CardsList from "./CardList.vue";
import CardTask from "./CardTask.vue";
import focusInput from "../../directives/focusInput";

export default {
  props: ["id", "name", "search"],
  components: {
    CardsList,
    CardTask,
  },
  directives: {
    focus: focusInput,
  },
  data() {
    return {
      isLabel: true,
      openFilter: false,
      openDelete: false,
      moveId: null,
      labelName: this.name,
      isError: false,
      sortBy: "",
    };
  },
  computed: {
    lists() {
      return this.$store.getters["lists"];
    },
    getBoardsNames() {
      return this.lists
        .filter((list) => list.id !== this.id)
        .map((list) => list.name);
    },
  },
  methods: {
    sortingArr(val) {
      this.sortBy = val;
    },
    changeLabel() {
      this.isLabel = !this.isLabel;
    },
    async changeLabelName() {
      if (this.labelName !== "") {
        try {
          this.$Progress.start();
          await axios.put("https://api-tarteeb.azurewebsites.net/api/Boards", {
            id: this.id,
            newName: this.labelName,
          });
          await this.$store.dispatch("getLists");
          this.$Progress.finish();
          this.isLabel = true;
        } catch ({ response }) {
          this.$Progress.fail();
          this.isError = true;
        }
      }
    },
    closeError() {
      this.isError = false;
    },
    clickDots() {
      this.openFilter = true;
      // this.openDelete = true;
    },
    close() {
      this.openDelete = false;
    },
    getInput(val) {
      const arr = this.lists
        .filter((list) => list.name === val)
        .map((l) => l.id);
      this.moveId = arr[0];
    },
    async deleteBoard() {
      try {
        this.$Progress.start();
        await axios.delete(
          `https://api-tarteeb.azurewebsites.net/api/Boards/${this.id}/${this.moveId}`
        );
        await this.$store.dispatch("getLists");
        await this.$store.dispatch("getCards");
        this.close();
        this.$Progress.finish();
      } catch (e) {
        this.openDelete = false;
        this.isError = true;
        this.$Progress.fail();
      }
    },
  },
  mounted() {
    this.moveId = this.lists
      .filter((list) => list.id !== this.id)
      .map((list) => list.id)[0];
  },
};
</script>

<style scoped>
/* .list-body {
  overflow-y: scroll;
} */
.list-body:hover .list-footer {
  display: block;
}
.list-body:hover .list-content {
  border-bottom-left-radius: 0;
}
.list-header {
  position: relative;
  display: flex;
  justify-content: center;
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
.list-header:hover #three-dots {
  display: initial;
}
.list-content {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 280px;
  max-width: 280px;
  min-height: 30rem;
  height: 69vh;
  background-color: rgba(235, 236, 240, 1);
  padding: 5px 10px 0px 10px;
  box-shadow: 1.5px 1.5px 1.5px 0.1px rgba(255, 255, 255, 0.1);
  color: rgba(24, 43, 77, 1);
  border-bottom-left-radius: 10px;
  overflow-y: scroll;
}
/* ::-webkit-scrollbar {
  display: none;
} */
.label-name {
  outline: none;
  min-width: 280px;
  max-width: 280px;
  line-height: 50px;
  padding: 0px 10px 0px 1.2rem;
  background-color: rgba(235, 236, 240, 1);
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  /* border-radius: 10px 10px 0px 0px; */
  color: #444;
}

.list-footer {
  display: none;
  position: relative;
  width: 280px;
  background-color: rgba(235, 236, 240, 1);
  border-radius: 0px 0px 10px 10px;
  color: white;
  border-top: 0.5px solid rgba(255, 255, 255, 0.25);
  padding: 0px 10px 10px 10px;
  transition: all 3s ease;
}
#three-dots {
  position: absolute;
  right: 5%;
  top: 0;
  display: none;
}
.three-dots {
  transition: all 0.2s ease;
}
#three-dots:hover .three-dots {
  fill: rgb(117, 135, 228);
}
.form-task * {
  color: #444;
}
.form-task h4 {
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 8px;
  border-bottom: 0.1px solid #444;
}
.form-task p {
  font-size: 14px;
}
.form-task .flex {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
}
.form-task .flex .first-board p:last-child {
  display: inline-block;
  text-decoration: line-through;
  padding: 4px 8px;
  background: rgba(206, 203, 203, 0.6);
}
.first-board {
  width: 45%;
}
.second-board {
  position: relative;
  width: 45%;
}
.second-board span {
  position: absolute;
  left: -12%;
  top: 50%;
}
.btn-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.btn-wrapper button {
  margin-left: 1rem;
}
.board-filter {
  width: 130px;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  background: rgb(245, 244, 244);
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  border-radius: 10px;
  z-index: 10;
}
.board-filter img {
  position: absolute;
  margin-top: 10px;
  left: 10px;
}
.board-filter small:first-child {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 25px;
  padding-right: 12px;
  /* background: #444; */
}
.board-filter small:first-child .icon-tabler {
  transition: all 0.3s ease;
}
.board-filter small:first-child:hover .icon-tabler {
  /* background: rgba(230, 225, 225, 0.9); */
  stroke: rgb(117, 135, 228);
}
.board-filter small:not(:nth-child(1)) {
  width: 100%;
  line-height: 35px;
  padding-left: 32px;
}
.board-filter small:not(:nth-child(1)):hover {
  background: rgb(230, 225, 225);
  border-radius: 10px;
}
.fade-enter-active {
  transition: all 0.4s ease-out;
}

.fade-leave-active {
  transition: all 0.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
