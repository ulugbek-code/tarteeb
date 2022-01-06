<template>
  <tr @click="openForm" :class="{ changedDay: isTimeOpened }" class="day">
    <td>{{ day.replace(/-/g, "/") }}</td>
    <td>0 h</td>
    <td>
      <!-- <button @click="write" class="btn">Request unlock</button> -->
      <button @click="write" class="btn">Deadlines for the day</button>
      <button @click="write" class="btn">Show tasks</button>
      <button @click="write" class="btn">Enter my time</button>
    </td>
  </tr>

  <tr v-if="isTimeOpened" class="form-time">
    <td class="time-wrapper" width="35%">
      <base-dropdown :options="['task1', 'task2']"></base-dropdown>
    </td>
    <td class="time-wrapper">
      <input type="number" />
      <span> h</span>
    </td>
    <td class="time-wrapper">
      <textarea rows="2" placeholder="Type your comment here..."></textarea>
    </td>
  </tr>

  <template v-if="isTimeOpened">
    <tr v-for="a in array" :key="a.task" class="tasks">
      <td>{{ a.task }}</td>
      <td>{{ a.hour }}</td>
      <td>{{ a.desc }}</td>
    </tr>
  </template>
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
tr.changedDay,
.form-time,
tr:not(:last-child) {
  border-bottom: 0.8px solid rgba(157, 152, 152, 0.7);
}
tr.changedDay {
  background: #fff;
}
.day td {
  padding: 1rem;
}
/* .day td:first-child {
  border-top-left-radius: 12px;
}
.day td:last-child {
  border-top-right-radius: 12px;
}
.form-time td:first-child,
.tasks:nth-child(2) td:first-child {
  border-bottom-left-radius: 12px;
}
.form-time td:last-child,
.tasks:last-child td:last-child {
  border-bottom-right-radius: 12px;
} */
.form-time td,
.tasks td {
  padding: 1rem 18px 10px;
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
  background: #fff;
}
.time-wrapper input {
  width: 40px;
  height: 35px;
  padding: 1px;
  outline: none;
}
.time-wrapper textarea {
  width: 96%;
  background: #f2f3f6;
  padding: 8px 12px;
  border-radius: 25px;
  outline: none;
  border: 1px solid rgba(67, 97, 238, 0.35);
  color: #444;
  font-family: "Poppins", sans-serif;
  resize: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
