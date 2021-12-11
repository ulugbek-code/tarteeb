<template>
  <div id="records-list">
    <div class="header-wrapper">
      <div class="tasks-header">
        <h2>Record Lists</h2>
      </div>
    </div>
    <div class="body-wrapper">
      <table>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Hours Worked</th>
          <th>Tasks</th>
          <th>Descriptions</th>
        </tr>
        <template v-if="lists.length">
          <tr v-for="list in lists" :key="list.id">
            <td>Elbek Normurodov</td>
            <td>{{ list.date.substring(0, 10) }}</td>
            <td>{{ list.hoursWorked }}</td>
            <td>{{ list.ticket ? list.ticket : "Task 1" }}</td>
            <td>{{ list.description }}</td>
          </tr>
        </template>
        <div v-else>Loading...</div>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isLoading: false,
      lists: [],
    };
  },
  methods: {
    async getLists() {
      try {
        this.isLoading = true;
        const res = await axios.get(
          "https://time-tracker.azurewebsites.net/api/Records/GetAll"
        );
        this.lists = res.data;
      } catch (e) {
        console.log(e.message);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.getLists();
  },
};
</script>

<style scoped>
#records-list {
  margin-left: 270px;
}
#users-container {
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
  padding: 1rem 2rem;
  background: hsla(0, 0%, 86.7%, 0.4);
  border-top: 2px solid rgba(19, 23, 40, 1);
  border-top-right-radius: 1%;
  border-top-left-radius: 1%;
}
table {
  border-collapse: collapse;
  width: 100%;
}

td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
th {
  text-align: center;
  padding: 12px;
  background: #fff;
  border: 1px solid #dddddd;
}
</style>
