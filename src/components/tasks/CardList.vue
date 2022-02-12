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
              :withObj="true"
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
              :withObj="true"
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
  <draggable
    :options="{ group: 'filteredCards' }"
    ghostClass="ghost"
    group="filteredCards"
    tag="div"
    :sort="true"
    class="card-parent"
    :move="checkMove"
    v-model="myCards"
  >
    <transition-group name="card">
      <div
        class="element-card"
        v-for="card in filteredCards"
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
      <div v-if="filteredCards.length == 0">
        <draggable
          class="dragArea list-group w-full"
          :list="fakeArray"
          group="filteredCards"
        >
          <div class="ele">
            <div class="desc">
              <p>{{ fakeArray[0].listId }}</p>
            </div>
          </div>
        </draggable>
      </div>
    </transition-group>
  </draggable>
</template>

<script>
import axios from "axios";
import { VueDraggableNext } from "vue-draggable-next";
import StarRating from "vue-star-rating";

export default {
  props: ["listId", "listName", "searchInput"],
  components: {
    draggable: VueDraggableNext,
    StarRating,
  },
  data() {
    return {
      currObj: {},
      nextStatusId: null,
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
      fakeArray: [
        {
          listId: this.listId,
        },
      ],
    };
  },
  computed: {
    myCards: {
      get() {
        return this.filteredCards; //filteredCards
      },
      async set() {
        const sendObj = {
          description: this.currObj.description,
          priority: this.currObj.priority,
          deadline: this.currObj.deadline, //"2022-01-10T00:00:00",
          updatedBy: this.$store.getters.loginUser.id,
          statusId: this.nextStatusId, // sometimes it is undefined
          userId: this.currObj.assigneeId, //assignee
          reporterId: this.currObj.reporterId,
        };
        // console.log(sendObj);
        if (
          this.currObj.id &&
          this.nextStatusId &&
          this.currObj.statusId !== this.nextStatusId
        ) {
          try {
            this.$Progress.start();
            await axios.put(
              `https://api-tarteeb.azurewebsites.net/api/Tasks/${this.currObj.id}`,
              sendObj
            );
            await this.$store.dispatch("getCards");
            this.$Progress.finish();
          } catch (e) {
            this.$Progress.fail();
          }
        }
      },
    },
    filteredCards() {
      // I used filteredCards instead of cardss
      return this.cardss.filter((card) =>
        card.description.toLowerCase().match(this.searchInput.toLowerCase())
      );
    },
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
      let users = this.$store.getters["users"].map((user) =>
        JSON.parse(JSON.stringify(user))
      );
      // console.log(users);
      // let finalUsers = [...users, this.getLoginUser];
      // console.log(finalUsers);
      return users;
    },
    overlayIsActive() {
      return this.$store.getters["overlay"];
    },
  },
  methods: {
    checkMove(evt) {
      this.currObj = evt.draggedContext.element;
      if (evt.relatedContext.element) {
        this.nextStatusId = evt.relatedContext.element.statusId;
      } else {
        this.nextStatusId = evt.relatedContext.list[0].listId; //.element.statusId;
      }
    },
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
        `https://api-tarteeb.azurewebsites.net/api/Tasks/${this.deletingId}`
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
      // console.log(val);
      this.assignee = val;
    },
    getReporter(val) {
      // console.log(val);
      this.reporter = val;
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
        updatedBy: this.$store.getters.loginUser.id, //changed-------
        statusId: this.statusName,
        userId: this.assignee, //assignee
        reporterId: this.reporter,
      };
      console.log(sendObj);
      try {
        this.$Progress.start();
        await axios.put(
          `https://api-tarteeb.azurewebsites.net/api/Tasks/${this.obj.id}`,
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
          `https://api-tarteeb.azurewebsites.net/api/Tasks/${id}`
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
  async created() {
    this.$Progress.start();
    await this.$store.dispatch("getCards");
    // await this.$store.dispatch("getUsers");
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
.ele {
  display: none;
}
.element-card {
  position: relative;
  background-color: white;
  height: auto;
  padding: 10px;
  border-radius: 5px;
  min-height: 30px;
  margin-bottom: 10px;
  word-break: break-word;
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
.desc p {
  width: 85%;
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
.card-parent {
  position: relative;
}
/* transition */
.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.card-enter-active,
.card-move {
  transition: all 0.4s ease-out 0.1s;
}
.card-leave-active {
  transition: all 0.4s ease-in;
  position: absolute;
}
.card-enter-to,
.card-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.card-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
