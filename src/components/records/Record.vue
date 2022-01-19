<template>
  <div @click="openForm" :class="{ changedDay: isTimeOpened }" class="day">
    <p>{{ day.date.replace(/-/g, "/") }}</p>
    <p>0 h</p>
    <div class="time-btn-wrapper">
      <button @click="write" class="btn">Deadlines for the day</button>
      <button @click="write" class="btn">Show tasks</button>
      <button @click="write" class="btn">Enter my time</button>
    </div>
  </div>

  <div v-if="isTimeOpened" class="form-time">
    <div class="time-wrapper">
      <base-dropdown
        :options="tasks"
        :withTask="true"
        :submitted="isCancelled"
        default="Tasks..."
        @input="getTask"
        @changee="isCancelled = false"
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
        <img @click="sendData" id="done" src="../../assets/done.svg" alt="" />
        <img @click="cancel" id="cancel" src="../../assets/wrong.svg" alt="" />
      </div>
    </div>
  </div>
  <div v-if="isTimeOpened" class="tasks-wrapper">
    <div v-for="time in times" :key="time.id">
      <record-task :dateOrg="day.dateOrg" :task="time"></record-task>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RecordTask from "./RecordTask.vue";

export default {
  props: ["day", "tasks"],
  components: {
    RecordTask,
  },
  data() {
    return {
      isTimeOpened: false,
      isCancelled: false,
      taskId: null,
      hours: null,
      desc: null,
    };
  },
  computed: {
    times() {
      return this.$store.getters.times;
    },
  },
  methods: {
    async sendData() {
      if (this.taskId && this.hours && this.desc) {
        try {
          this.$Progress.start();
          await axios.post("https://time-tracker.azurewebsites.net/api/Times", {
            taskId: this.taskId,
            userId: this.$store.getters.loginUser.id,
            date: this.day.dateOrg,
            hoursWorked: this.hours,
            comment: this.desc,
          });
          await this.$store.dispatch("getTimes");
          this.$Progress.finish();
          this.cancel();
        } catch (e) {
          console.log(e);
          this.$Progress.fail();
        }
      }
    },
    openForm() {
      // const el = this.$refs.scrollToMe;
      this.isTimeOpened = !this.isTimeOpened;
    },
    getTask(id) {
      this.taskId = id;
    },
    cancel() {
      this.hours = null;
      this.desc = null;
      this.taskId = null;
      this.isCancelled = true;
    },
  },
  async created() {
    this.$Progress.start();
    await this.$store.dispatch("getTimes");
  },
  mounted() {
    this.$Progress.finish();
  },
};
</script>

<style scoped>
.day,
.form-time {
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.day p:first-child,
.form-time .time-wrapper:first-child {
  width: 35%;
}
.day p:nth-child(2),
.form-time .time-wrapper:nth-child(2) {
  justify-content: center;
  width: 10%;
}
.day p:nth-child(2) {
  text-align: center;
}
.day .time-btn-wrapper,
.form-time .time-wrapper:last-child {
  width: 55%;
}
.time-btn-wrapper {
  display: flex;
  align-items: center;
}
.day.changedDay {
  margin-top: 6px;
  border-radius: 12px 12px 0 0;
  background: #fff;
  box-shadow: 0 -5px 5px -5px rgb(132, 131, 131);
}
.day p,
.day .time-btn-wrapper {
  padding: 1rem;
  font-weight: 500;
  font-size: 15px;
}
.btn {
  background: #fff;
  color: #444;
  border: 1px solid #444;
  outline: none;
  border-radius: 13px;
  padding: 3px 6px;
  font-size: 12px;
  margin-right: 1rem;
  cursor: pointer;
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
.day {
  transition: all 0.1s ease;
  cursor: pointer;
}
.day:hover {
  border-radius: 25px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.day.changedDay:hover {
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -5px 5px -5px rgb(132, 131, 131);
}
.tasks-wrapper {
  padding-bottom: 6px;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 6px;
  box-shadow: 0 5px 5px -5px rgb(132, 131, 131);
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
