<template>
  <base-dialog v-if="openDelete" color="#fff" width="480px" @close="close">
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
            <p>New task layout:</p>
            <span><img src="../../assets/next.png" alt="" /></span
            ><base-dropdown
              :options="getBoardsNames"
              @input="getInput"
            ></base-dropdown>
          </div>
        </div>
      </form>
    </template>
    <template #actions>
      <div class="btn-wrapper">
        <the-button @click="deleteBoard" :red="true" class="form-btn"
          >Delete</the-button
        >
        <the-button @click="close" class="form-btn">Cancel</the-button>
      </div>
    </template>
  </base-dialog>
  <div class="list-header">
    <label v-if="isLabel" @dblclick="changeLabel">{{ name }}</label>
    <span @click.stop="clickDots" id="three-dots"
      ><img src="../../assets/trash.svg" alt=""
    /></span>
    <input
      v-if="!isLabel"
      @dblclick="changeLabel"
      @keyup.enter="changeLabelName"
      type="text"
      class="label-name"
      v-model="labelName"
      placeholder="New status name here ..."
      autofocus
    />
  </div>

  <div class="list-content">
    <CardsList :listId="id" :listName="name" />
  </div>
  <div class="list-footer">
    <card-task :listId="id"></card-task>
  </div>
</template>

<script>
import axios from "axios";
import CardsList from "./CardList.vue";
import CardTask from "./CardTask.vue";
export default {
  props: ["id", "name"],
  components: {
    CardsList,
    CardTask,
  },
  data() {
    return {
      isLabel: true,
      openDelete: false,
      moveId: null,
      labelName: this.name,
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
    changeLabel() {
      this.isLabel = !this.isLabel;
    },
    async changeLabelName() {
      if (this.labelName !== "") {
        this.$Progress.start();
        await axios.put("https://time-tracker.azurewebsites.net/api/Boards", {
          id: this.id,
          newName: this.labelName,
        });
        await this.$store.dispatch("getLists");
        this.$Progress.finish();
        this.isLabel = true;
      }
    },
    clickDots() {
      this.openDelete = true;
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
      this.$Progress.start();
      await axios.delete(
        `https://time-tracker.azurewebsites.net/api/Boards/${this.id}/${this.moveId}`
      );
      await this.$store.dispatch("getLists");
      await this.$store.dispatch("getCards");
      this.$Progress.finish();
      this.close();
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
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 280px;
  max-width: 280px;
  height: auto;
  background-color: rgba(235, 236, 240, 1);
  padding: 5px 10px 0px 10px;
  box-shadow: 1.5px 1.5px 1.5px 0.1px rgba(255, 255, 255, 0.1);
  color: rgba(24, 43, 77, 1);
}
.label-name {
  outline: none;
  min-width: 280px;
  max-width: 280px;
  line-height: 50px;
  padding: 0px 10px 0px 1.2rem;
  background-color: rgba(235, 236, 240, 1);
  font-family: "Poppins", sans-serif;
  /* border-radius: 10px 10px 0px 0px; */
  color: #444;
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
#three-dots {
  position: absolute;
  right: 5%;
  top: 6%;
  display: none;
  transition: all 0.3s ease;
}
#three-dots:hover img {
  background: #e0e4e9;
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
</style>
