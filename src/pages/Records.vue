<template>
  <the-navigation></the-navigation>
  <div :class="[!isNavOpened ? 'nav' : '']" id="records-container">
    <div class="header-wrapper">
      <div class="tasks-header">
        <h2>Weekly time sheet</h2>

        <p>
          <span><img src="../assets/left1.png" alt="" /></span> 03 January - 09
          January <span><img src="../assets/right-arrow.png" alt="" /></span>
        </p>
      </div>
    </div>
    <div class="body-wrapper">
      <div class="first-r">
        <table>
          <tr>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>ACTION</th>
          </tr>
          <template v-for="day in days" :key="day">
            <Record :day="day" />
          </template>
        </table>
      </div>
      <div class="second-r">
        <bulk-insert></bulk-insert>
      </div>
    </div>
  </div>
</template>

<script>
import Record from "../components/Record.vue";
import BulkInsert from "../components/records/BulkInsert.vue";
export default {
  components: {
    Record,
    BulkInsert,
  },
  data() {
    return {
      days: [],
    };
  },
  computed: {
    isNavOpened() {
      return this.$store.getters.isNavOpened;
    },
  },
  methods: {
    getCurentWeek() {
      let curr = new Date();
      let week = [];

      for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i;
        let day = new Date(curr.setDate(first)).toDateString(); //.slice(0, 10)
        day =
          day.substring(8, 10) +
          "−" +
          day.substring(4, 7) +
          ", " +
          day.substring(0, 3);
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
  transition: all 0.4s ease;
}
#records-container.nav {
  margin-left: 110px;
}
.header-wrapper {
  height: 12vh;
  padding: 1rem 0 1rem 3rem;
}
.tasks-header {
  color: #444;
}
.tasks-header img {
  width: 12px;
}
.body-wrapper {
  display: flex;
  justify-content: space-between;
  height: 88vh;
  padding: 1rem;
  color: #444;
}
.first-r {
  width: 68%;
  background: hsla(0, 0%, 86.7%, 0.4);
  padding: 1rem;
  border-radius: 12px;
}
.second-r {
  width: 30%;
}
table {
  border-collapse: collapse;
  width: 100%;
}
table th {
  text-align: left;
  padding-left: 1rem;
}
</style>
