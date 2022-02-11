<template>
  <div
    v-if="dateOrg === task.date && !isEditOpened"
    @click="edit"
    @dblclick="triggerEdit"
    class="tasks"
  >
    <p>TT-{{ task.taskId }}</p>
    <p>{{ task.hoursWorked }} h</p>
    <p>
      {{ task.comment }}
      <span @click.stop="edit" class="task-btn-wrapper">
        <img src="../../assets/more.svg" alt="" />
      </span>
      <span :class="{ trash: isEdit }" id="edit">
        <small @click="triggerEdit">Edit</small>
        <small @click="deleteTask(task.id)">Delete</small>
      </span>
    </p>
  </div>
  <!-- edit task -->
  <div v-if="isEditOpened" class="form-time">
    <div class="time-wrapper">
      <base-dropdown
        :options="tasks"
        :withTask="true"
        :default="'TT-' + task.taskId"
        @input="getTask"
      ></base-dropdown>
    </div>
    <div class="time-wrapper">
      <input v-model="hours" type="number" />
      <span>h</span>
    </div>
    <div class="time-wrapper">
      <input
        v-model="desc"
        type="text"
        placeholder="Some description here..."
      />
      <div class="btn-wrapper">
        <img
          @click="sendEditData"
          id="done"
          src="../../assets/done.svg"
          alt=""
        />
        <img
          @click="triggerEdit"
          id="cancel"
          src="../../assets/wrong.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["dateOrg", "task", "tasks"],
  data() {
    return {
      isEdit: false,
      isEditOpened: false,
      hours: this.task.hoursWorked,
      desc: this.task.comment,
      taskId: this.task.taskId,
    };
  },
  methods: {
    getTask(id) {
      this.taskId = id;
    },
    triggerEdit() {
      this.isEditOpened = !this.isEditOpened;
    },
    edit() {
      this.isEdit = !this.isEdit;
    },
    async deleteTask(id) {
      try {
        this.$Progress.start();
        await axios.delete(
          `https://api-tarteeb.azurewebsites.net/api/Times/${id}`
        );
        this.$Progress.finish();
        await this.$store.dispatch("getTimes");
      } catch (e) {
        console.log(e);
        this.$Progress.fail();
      }
    },
    async sendEditData() {
      try {
        this.$Progress.start();
        await axios.put("https://api-tarteeb.azurewebsites.net/api/Times", {
          id: this.task.id,
          taskId: this.taskId,
          userId: this.task.userId,
          date: this.task.date,
          hoursWorked: this.hours,
          comment: this.desc,
        });
        await this.$store.dispatch("getTimes");
        this.triggerEdit();
        this.$Progress.finish();
      } catch (e) {
        console.log(e);
        this.$Progress.fail();
      }
    },
  },
};
</script>

<style scoped>
.tasks,
.form-time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 0.8px solid rgba(0, 0, 0, 0.2);
  position: relative;
  background: #fff;
  font-size: 14px;
}
.tasks {
  padding: 10px 16px;
}
p:first-child,
.form-time .time-wrapper:first-child {
  width: 35%;
}
p:nth-child(2),
.form-time .time-wrapper:nth-child(2) {
  justify-content: center;
  text-align: center;
  width: 10%;
}
p:last-child,
.form-time .time-wrapper:last-child {
  width: 55%;
  padding-left: 16px;
}
.form-time {
  position: relative;
  background: #fff;
}
.time-wrapper {
  padding: 10px 16px;
  font-size: 14px;
}
.time-wrapper input {
  width: 40px;
  height: 35px;
  padding: 8px;
  color: #444;
  background: #f2f3f6;
  font-family: "Poppins", sans-serif;
  border: 1px solid rgba(67, 97, 238, 0.35);
  outline: none;
}
.time-wrapper:nth-child(3) input {
  width: 90%;
  display: inline-block;
  border-radius: 25px;
  font-size: 13px;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.time-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
.time-wrapper:last-child {
  padding-right: 0;
}

.time-wrapper .btn-wrapper {
  max-width: 30px;
  display: flex;
  flex-direction: column;
  border-radius: 0 12px 12px 0;
  cursor: pointer;
}
.btn-wrapper img {
  width: 100%;
  height: 100%;
  padding: 10px;
}
.task-btn-wrapper {
  display: none;
  padding: 2px;
  position: absolute;
  top: 26%;
  right: 1%;
  cursor: pointer;
}
.tasks:hover .task-btn-wrapper {
  display: initial;
}
#edit {
  opacity: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  width: 100px;
  padding: 4px;
  font-size: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 4px;
  position: absolute;
  top: 40%;
  right: 2%;
  background: #fff;
  cursor: pointer;
  z-index: 10;
}
#edit.trash {
  opacity: 1;
  pointer-events: initial;
}
#edit small:hover {
  background: rgb(199, 204, 206);
}
#done {
  background: #18cc2abf;
  border-top-right-radius: 12px;
}
#done:hover {
  background: #3fec50bf;
}
#cancel {
  background: #43e4eebf;
  border-bottom-right-radius: 12px;
}
#cancel:hover {
  background: #04bdcbbf;
}
</style>
