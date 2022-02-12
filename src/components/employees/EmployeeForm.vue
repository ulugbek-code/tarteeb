<template>
  <div id="emp-form">
    <div class="box-header">
      <button @click="$emit('addEmp')">Add Employee</button>
    </div>
    <div v-if="userId !== null" class="box">
      <!-- bottom was !noUser && times.length -->
      <div class="emp-wrapper">
        <div class="emp-header">
          <div class="emp-header-first">
            <h2>{{ getCurrentUser.firstName }}'s Timesheet</h2>
            <div>
              <base-dropdown
                :options="months"
                default="Choose a month"
                @input="getCurrentMonth"
                :submitted="isCancelled"
                @changee="isCancelled = false"
              ></base-dropdown>
            </div>
          </div>
          <div class="emp-header-second"></div>
        </div>
        <div class="emp-body">
          <div class="emp-body-header">
            <h4>DAY</h4>
            <h4>TASK ID</h4>
            <h4>HOURS WORKED</h4>
            <h4>COMMENT</h4>
          </div>
          <template v-if="!noUser">
            <div v-for="time in times" :key="time.id" class="emp-body-body">
              <p>
                {{ new Date(time.date).toDateString().substr(0, 10) }}
              </p>
              <p>TT-{{ time.taskId }}</p>
              <p>{{ time.hoursWorked }} h</p>
              <p>
                {{ time.comment }}
              </p>
            </div>
          </template>
          <div v-else-if="noUser && times.length === 0">
            <img src="../../assets/warn.png" alt="" />
            <p>There are not any records for this employee yet...</p>
          </div>
        </div>
        <!-- new Date('2022-01-20T00:00:00').toDateString() -->
        <!-- new Date('2022-01-20T00:00:00').getMonth() -->
      </div>
    </div>
    <div v-else class="box">
      <h2>Ooops, sorry boss!</h2>
      <p>You haven’t chosen any employee yet...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["userId", "month"],
  data() {
    return {
      noUser: false,
      isCancelled: false,
      times: [],
      currentMonth: new Date().getMonth(),
    };
  },
  computed: {
    months() {
      return this.$store.getters.months;
    },
    getCurrentUser() {
      const users = this.$store.getters.users;
      const current = users.filter((user) => user.id === this.userId);
      return current[0];
    },
  },
  methods: {
    async getTimesById(mon) {
      try {
        this.$Progress.start();
        const res = await axios.get(
          `https://api-tarteeb.azurewebsites.net/api/Times/${this.userId}`
        );
        this.times = res.data;
        let timesByMonth;
        if (mon === undefined) {
          timesByMonth = this.times.filter(
            (time) => new Date(time.date).getMonth() == new Date().getMonth()
          );
        } else {
          timesByMonth = this.times.filter(
            (time) => new Date(time.date).getMonth() == mon
          );
        }
        this.times = timesByMonth;

        if (!this.times.length) {
          this.noUser = true;
        }
        this.$Progress.finish();
      } catch (e) {
        console.log(e);
        this.$Progress.fail();
      }
    },
    async getCurrentMonth(month) {
      this.$Progress.start();
      let currMonth = this.months.indexOf(month);
      await this.getTimesById(currMonth);
      // let timesByMonth = this.times.filter(
      //   (time) => new Date(time.date).getMonth() == currMonth
      // );

      // this.times = timesByMonth;
      this.$Progress.finish();
    },
  },
  watch: {
    async userId() {
      await this.getTimesById();
      this.isCancelled = true;
    },
    month(val) {
      // this.currentMonth = val;
      console.log(val);
    },
    times() {
      if (this.times.length) {
        this.noUser = false;
      }
    },
  },
};
</script>

<style scoped>
#emp-form {
  flex: 1;
  height: 85vh;
  padding-top: 0.5rem;
}
.box-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 24px 16px 12px 16px;
}
.box-header button {
  font-family: "Poppins", sans-serif;
  color: #fff;
  font-weight: 500;
  background: rgba(67, 97, 238, 1);
  transition: all 0.2s ease;
  padding: 4px 10px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
}
.box-header button:hover {
  background: rgba(67, 97, 238, 0.8);
}
.box {
  background: hsla(0, 0%, 86.7%, 0.4);
  color: #444;
  height: inherit;
  border-radius: 15px;
  padding: 1rem;
}

img {
  width: 18px;
}
.emp-header {
  display: flex;
}
.emp-header-first {
  display: flex;
  flex-direction: column;
}
.emp-header-first {
  flex: 2;
}
.emp-header-first div {
  width: 70%;
}
.emp-header-second {
  flex: 1;
}
.emp-body {
  overflow-y: scroll;
  height: 70vh;
}
::-webkit-scrollbar {
  display: none;
}
.emp-body-header,
.emp-body-body {
  display: flex;
  align-items: center;
  padding: 8px 12px;
}
.emp-body-header h4,
.emp-body-body p {
  width: 22%;
}
.emp-body-body {
  border-radius: 10px;
  font-size: 14px;
}
.emp-body-body:hover {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
.emp-body-header h4:last-child,
.emp-body-body p:last-child {
  width: 34%;
  /* text-align: end; */
}
</style>
