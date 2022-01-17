<template>
  <div @click="openForm" :class="{ changedDay: isTimeOpened }" class="day">
    <p>{{ day.replace(/-/g, "/") }}</p>
    <p>0 h</p>
    <div class="time-btn-wrapper">
      <button @click="write" class="btn">Deadlines for the day</button>
      <button @click="write" class="btn">Show tasks</button>
      <button @click="write" class="btn">Enter my time</button>
    </div>
  </div>

  <div v-if="isTimeOpened" class="form-time">
    <div class="time-wrapper">
      <base-dropdown :options="['task1', 'task2']"></base-dropdown>
    </div>
    <div class="time-wrapper">
      <input type="number" />
      <span>h</span>
    </div>
    <div class="time-wrapper">
      <textarea placeholder="Type your comment here..."></textarea>
      <div class="btn-wrapper">
        <img id="done" src="../../assets/done.svg" alt="" />
        <img id="cancel" src="../../assets/wrong.svg" alt="" />
      </div>
    </div>
  </div>
  <div v-if="isTimeOpened" class="tasks-wrapper">
    <div v-for="a in array" :key="a.task" class="tasks">
      <p>{{ a.task }}</p>
      <p>{{ a.hour }} h</p>
      <p>
        {{ a.desc }}
      </p>
      <div class="task-btn-wrapper">
        <img id="trash" src="../../assets/trash.svg" alt="" />
        <img id="edit" src="../../assets/edit.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
// import BaseDropdown from "../components/BaseDropdown.vue";

export default {
  props: ["day"],
  data() {
    return {
      isTimeOpened: false,
      option: "Task 1",
      array: [
        {
          task: "task 1",
          hour: 12,
          desc: "The points defining a custom star shape.",
        },
        {
          task: "task 2",
          hour: 8,
          desc: "When set to true, the rating cannot be edited.",
        },
      ],
    };
  },
  methods: {
    openForm() {
      this.isTimeOpened = !this.isTimeOpened;
    },
    getOption(opt) {
      this.option = opt;
    },
    cancel() {
      this.hour = "";
      this.desc = "";
      this.overTime = "";
    },
  },
};
</script>

<style scoped>
.day,
.form-time,
.form-time div:nth-child(2),
.tasks {
  width: 100%;
  display: flex;
  align-items: center;
}
.tasks {
  border-top: 0.8px solid rgba(0, 0, 0, 0.2);
}
.day p:first-child,
.form-time .time-wrapper:first-child,
.tasks p:first-child {
  width: 35%;
}
.day p:nth-child(2),
.form-time .time-wrapper:nth-child(2),
.tasks p:nth-child(2) {
  justify-content: center;
  width: 8%;
}
.day p:nth-child(2),
.tasks p:nth-child(2) {
  text-align: center;
}
.day .time-btn-wrapper,
.form-time .time-wrapper:last-child,
.tasks p:last-child {
  width: 57%;
}
.time-btn-wrapper {
  display: flex;
  align-items: center;
}
.day.changedDay {
  margin-top: 6px;
  border-radius: 12px 12px 0 0;
  background: #fff;
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
.form-time,
.tasks {
  position: relative;
  background: #fff;
}
.time-wrapper,
.tasks {
  padding: 10px 16px;
  font-size: 14px;
}
.time-wrapper input {
  width: 40px;
  height: 35px;
  padding: 1px;
  background: #f2f3f6;
  border: 1px solid rgba(67, 97, 238, 0.35);
  outline: none;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.time-wrapper {
  display: flex;
  gap: 12px;
}
.time-wrapper:last-child {
  padding-right: 0;
}
.time-wrapper textarea {
  width: 100%;
  background: #f2f3f6;
  padding: 8px 12px;
  border-radius: 25px;
  outline: none;
  border: 1px solid rgba(67, 97, 238, 0.35);
  color: #444;
  font-family: "Poppins", sans-serif;
  resize: none;
}
.time-wrapper .btn-wrapper {
  max-width: 30px;
  flex-direction: column;
  border-radius: 0 12px 12px 0;
  cursor: pointer;
}
.btn-wrapper img {
  width: 100%;
  height: 100%;
  padding: 10px;
  /* background:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa chartreuse; */
}
.task-btn-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 30px;
  max-height: 3.4rem;
  /* padding: 12px; */
  position: absolute;
  right: 0;
}
#done {
  background: #18cc2abf;
  border-top-right-radius: 12px;
}
#cancel {
  background: #43e4eebf;
  border-bottom-right-radius: 12px;
}
#trash {
  width: 100%;
  padding: 4px;
  background: #cc1818bf;
  border-top-right-radius: 12px;
}
#edit {
  width: 100%;
  /* height: 20px; */
  padding: 4px;
  background: #4361eebf;
  border-bottom-right-radius: 12px;
}
.tasks-wrapper {
  padding-bottom: 6px;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 6px;
}
.tasks {
  min-height: 3.4rem;
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
  box-shadow: none;
}
</style>
