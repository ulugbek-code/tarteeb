<template>
  <base-dialog :show="isBtnClicked" color="#fff" width="680px" @close="close">
    <template #default>
      <form class="form-task">
        <h2>Edit the task</h2>
        <div class="parent">
          <div class="input-wrapper div1">
            <textarea rows="4" v-model="newDesc"></textarea>
          </div>
          <div class="div2">
            <span id="reporter">Assignee</span>
            <base-dropdown
              :options="getUsers"
              :default="obj.assignee.firstName + ' ' + obj.assignee.lastName"
              @input="getAssignee"
            ></base-dropdown>
          </div>
          <div class="div3">
            <input v-model="date" type="date" name="" id="" />
          </div>
          <div class="div4">
            <span id="reporter">Reporter</span>
            <base-dropdown
              :options="getUsers"
              :default="obj.reporter.firstName + ' ' + obj.reporter.lastName"
              @input="getReporter"
            ></base-dropdown>
          </div>
          <div class="div5">
            <span id="reporter">Status</span>
            <base-dropdown
              :options="listsName"
              :default="obj.status.name"
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
        <the-button @click="sendEdit" :green="true" class="form-btn"
          >Save</the-button
        >
        <the-button :red="true" @click="close" class="form-btn"
          >Cancel</the-button
        >
      </div>
    </template>
  </base-dialog>
  <!-- delete pop up -->
  <base-dialog
    :show="isDeleteClicked"
    color="#fff"
    width="480px"
    @close="closeDelete"
  >
    <template #default>
      <form class="form-deleting">
        <h4>Delete TT-{{ deletingId }}?</h4>
        <p>
          You are about to permanently delete this task and its associated
          comments, data, and attachments.
        </p>
        <p>Instead, you can choose to decide or close it.</p>
      </form>
    </template>
    <template #actions>
      <div class="btn-wrapper">
        <the-button @click="deleteTask" :red="true" class="form-btn"
          >Delete</the-button
        >
        <the-button @click="closeDelete" class="form-btn">Cancel</the-button>
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
  <draggable :options="{ group: 'cardss' }" group="cardss" ghostClass="ghost">
    <div
      class="element-card"
      v-for="card in cardss"
      :key="card.id"
      @click="togglePopup(card.id)"
    >
      <div class="desc">
        <p>{{ card.description }}</p>
        <span @click.stop="toggleDelete(card.id)" id="three-dots">
          <img src="../../assets/trash.svg" alt="" />
        </span>
      </div>
      <div class="priority">
        <div>
          <p>TT-{{ card.id }}</p>
          <star-rating
            :rating="card.priority"
            :star-size="13"
            :max-rating="3"
            :show-rating="false"
            :read-only="true"
          ></star-rating>
        </div>
        <p id="fullname">
          {{ card.assignee.firstName[0] }}{{ card.assignee.lastName[0] }}
        </p>
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
      isDeleteClicked: false,
      isError: false,
      deletingId: null,
      rating: null,
      date: null,
      newDesc: null,
      assignee: null,
      reporter: null,
      statusName: null,
      obj: {},
    };
  },
  methods: {
    toggleDelete(id) {
      this.isDeleteClicked = true;
      this.deletingId = id;
    },
    closeError() {
      this.isError = false;
    },
    async deleteTask() {
      this.$Progress.start();
      await axios.delete(
        `https://time-tracker.azurewebsites.net/api/Tasks/${this.deletingId}`
      );
      await this.$store.dispatch("getCards");
      this.$Progress.finish();
      this.isDeleteClicked = false;
      this.deletingId = null;
    },
    closeDelete() {
      this.isDeleteClicked = false;
    },
    getAssignee(val) {
      const users = this.$store.getters["users"];
      const first = val.substr(0, val.indexOf(" "));
      this.assignee = users
        .filter((user) => user.firstName === first)
        .map((user) => user.id)[0];
      // console.log(this.assignee);
    },
    // getDate(val) {
    //   this.date = val;
    // },
    getReporter(val) {
      const users = this.$store.getters["users"];
      const first = val.substr(0, val.indexOf(" "));
      this.reporter = users
        .filter((user) => user.firstName === first)
        .map((user) => user.id)[0];
      // console.log(this.reporter);
    },
    getStatus(val) {
      const i = this.getLists
        .filter((list) => list.name === val)
        .map((list) => list.id);
      this.statusName = i[0];
    },
    async sendEdit() {
      const sendObj = {
        description: this.newDesc,
        priority: this.rating,
        deadline: this.date + "T00:00:00", //"2022-01-10T14:24:03.485Z",
        updatedBy: 4,
        statusId: this.statusName,
        userId: this.assignee, //assignee
        reporterId: this.reporter,
      };
      // console.log(sendObj);
      try {
        this.$Progress.start();
        await axios.put(
          `https://time-tracker.azurewebsites.net/api/Tasks/${this.obj.id}`,
          sendObj
        );
        await this.$store.dispatch("getCards");
        this.$Progress.finish();
      } catch (e) {
        this.$Progress.fail();
        this.isError = true;
      }

      this.close();
    },
    async togglePopup(id) {
      try {
        this.$Progress.start();
        const res = await axios.get(
          `https://time-tracker.azurewebsites.net/api/Tasks/${id}`
        );
        this.obj = res.data;
        // console.log(this.obj);
        this.isBtnClicked = true;
        this.$Progress.finish();
      } catch (e) {
        this.$Progress.fail();
        this.isError = true;
      }
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
    getUsers() {
      const users = this.$store.getters["users"];
      return users.map((user) => `${user.firstName} ${user.lastName}`);
    },
    overlayIsActive() {
      return this.$store.getters["overlay"];
    },
  },
  async created() {
    this.$Progress.start();
    await this.$store.dispatch("getCards");
  },
  mounted() {
    this.$Progress.finish();
  },
  watch: {
    obj(val) {
      this.rating = val.priority;
      this.newDesc = val.description;
      this.assignee = val.assigneeId;
      this.date = val.deadline.substr(0, 10);
      this.statusName = val.statusId;
      this.reporter = val.reporterId;
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
.desc,
.priority {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}
.desc {
  min-height: 31px;
}
#three-dots {
  display: none;
  transition: background 0.2s ease;
}
.element-card:hover #three-dots {
  display: block;
}
#three-dots:hover img {
  background: #f1f1f1;
}
.priority {
  margin-top: 8px;
  font-size: 11px;
}
.priority div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  /* background: black; */
}
#fullname {
  background: rgb(236, 233, 233);
  padding: 2px 3px;
  border-radius: 50%;
}
.form-task,
.form-deleting {
  width: 100%;
  box-sizing: border-box;
}
.form-task *,
.form-deleting * {
  font-family: "Poppins", sans-serif;
  color: #444;
  font-size: 14px;
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
  position: relative;
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
  position: relative;
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
.form-deleting h4 {
  margin-bottom: 4px;
}
.form-deleting p {
  margin-top: 8px;
}
</style>
