<template>
  <div id="records-container">
    <div class="header-wrapper">
      <div class="tasks-header">
        <h2>Records</h2>
      </div>
    </div>
    <div class="body-wrapper">
      <div v-for="day in days" :key="day">
        <Record :day="day" />
      </div>
    </div>
  </div>
</template>

<script>
import Record from "../components/Record.vue";
export default {
  components: {
    Record,
  },
  data() {
    return {
      days: [],
    };
  },
  methods: {
    getCurentWeek() {
      let curr = new Date();
      let week = [];

      for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i;
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
        week.push(day);
      }
      this.days = week;
    },
  },
  created() {
    this.getCurentWeek();
  },
};
</script>

<style scoped>
#records-container {
  margin-left: 270px;
}
.header-wrapper {
  height: 10vh;
  padding: 1rem 2rem;
}
.tasks-header {
  width: 90%;
  margin: 0 auto;
}
.body-wrapper {
  height: 90vh;
  padding: 12px 24px;
  background: hsla(0, 0%, 86.7%, 0.4);
  border-top: 2px solid rgba(19, 23, 40, 1);
  border-top-right-radius: 1%;
  border-top-left-radius: 1%;
}
</style>
