<template>
  <div v-if="dateOrg === task.date" @click="edit" class="tasks">
    <p>TT-{{ task.taskId }}</p>
    <p>{{ task.hoursWorked }} h</p>
    <p>
      {{ task.comment }}
      <span @click.stop="edit" class="task-btn-wrapper">
        <img src="../../assets/more.svg" alt="" />
      </span>
      <span :class="{ trash: isEdit }" id="edit">
        <small>Edit</small>
        <small @click="deleteTask(task.id)">Delete</small>
      </span>
    </p>
  </div>
  <!-- <div></div> -->
  <!-- {{ dateOrg }}={{ task.date }} -->
</template>

<script>
import axios from "axios";

export default {
  props: ["dateOrg", "task"],
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    edit() {
      this.isEdit = !this.isEdit;
    },
    async deleteTask(id) {
      try {
        this.$Progress.start();
        const res = await axios.delete(
          `https://time-tracker.azurewebsites.net/api/Times/${id}`
        );
        console.log(res);
        await this.$store.dispatch("getTimes");
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
.tasks {
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 0.8px solid rgba(0, 0, 0, 0.2);
  position: relative;
  background: #fff;
  padding: 10px 16px;
  font-size: 14px;
}
p:first-child {
  width: 35%;
}
p:nth-child(2) {
  justify-content: center;
  text-align: center;
  width: 10%;
}
p:last-child {
  width: 55%;
  padding-left: 16px;
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
</style>
