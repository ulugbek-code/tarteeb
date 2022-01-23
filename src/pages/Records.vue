<template>
  <div>
    <the-navigation></the-navigation>
    <div :class="[!isNavOpened ? 'nav' : '']" id="records-container">
      <div class="header-wrapper">
        <div class="tasks-header">
          <h2>Weekly time sheet</h2>
          <p>
            <span @click="prev"><img src="../assets/left1.png" alt="" /></span>
            {{ firstDay }} -
            {{ lastDay }}
            <span @click="next"
              ><img src="../assets/right-arrow.png" alt=""
            /></span>
          </p>
        </div>
      </div>
      <div class="body-wrapper">
        <div class="first-r">
          <!-- <div class="time-wrapper"> -->
          <div class="time-flex">
            <h4>DATE</h4>
            <h4>TOTAL</h4>
            <h4>ACTION</h4>
          </div>
          <template v-for="day in allDays" :key="day">
            <Record :day="day" :tasks="tasks" />
          </template>
          <!-- </div> -->
        </div>
        <div class="second-r">
          <bulk-insert></bulk-insert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Record from "../components/records/Record.vue";
import BulkInsert from "../components/records/BulkInsert.vue";
export default {
  components: {
    Record,
    BulkInsert,
  },
  computed: {
    tasks() {
      const cards = this.$store.getters["cardss"];
      return cards.map((card) => {
        return {
          id: card.id,
          desc: card.description,
        };
      });
    },
    allDays() {
      return this.$store.getters.allDays;
    },
    days() {
      return this.$store.getters.days;
    },
    first() {
      return this.$store.getters.first;
    },
    last() {
      return this.$store.getters.last;
    },
    firstDay() {
      return this.$store.getters.firstDay;
    },
    lastDay() {
      return this.$store.getters.lastDay;
    },
    isNavOpened() {
      return this.$store.getters.isNavOpened;
    },
  },
  methods: {
    prev() {
      this.$store.dispatch("getDays", "prev");
    },
    next() {
      this.$store.dispatch("getDays", "next");
    },
  },
  async created() {
    this.$Progress.start();
    this.$store.dispatch("getDays");
    await this.$store.dispatch("getCards");
  },
  mounted() {
    this.$Progress.finish();
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
  cursor: pointer;
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
  height: 82vh;
  overflow-y: scroll;
  background: hsla(0, 0%, 86.7%, 0.4);
  padding: 1rem;
  border-radius: 12px;
}
.second-r {
  width: 30%;
}
.time-flex {
  width: 100%;
  display: flex;
  margin-bottom: 4px;
}
.time-flex h4:nth-child(1) {
  width: 35%;
}
.time-flex h4:nth-child(2) {
  width: 10%;
}
.time-flex h4:last-child {
  width: 55%;
}
.time-flex h4 {
  text-align: center;
  /* padding-left: 1rem; */
  font-size: 14px;
}
</style>
