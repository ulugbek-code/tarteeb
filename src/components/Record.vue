<template>
  <div @click="openForm" class="day">
    <span><img src="../assets/down.png" alt="" /></span>
    <div>
      <p>{{ day.replace(/-/g, "/") }}</p>
      <h4>Elbek Normurodov</h4>
    </div>
  </div>
  <div v-if="isOpen" class="form">
    <table>
      <tr>
        <th width="40%"><h4>Tickets</h4></th>
        <th width="3%"><h4>Hours</h4></th>
        <th width="5%"><h4>Overtime</h4></th>
        <th><h4>Status</h4></th>
        <th><h4>Action</h4></th>
      </tr>
      <tr>
        <td width="40%">
          <base-dropdown
            :options="['Task 1', 'Task 2', 'Task 3', 'Task 4']"
          ></base-dropdown>
        </td>
        <td width="3%"><input type="text" /></td>
        <td width="5%">
          <input type="text" />
        </td>
        <td>
          <p>?</p>
        </td>
      </tr>
      <tr>
        <td width="40%">
          <textarea rows="3" placeholder="Description"></textarea>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <button class="red">Cancel</button><button class="green">Send</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import BaseDropdown from "../components/BaseDropdown.vue";

export default {
  props: ["day"],
  components: {
    BaseDropdown,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    openForm() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.day {
  display: flex;
  background: #fff;
  margin: 4px 0;
  padding: 6px;
  border-radius: 5px;
  cursor: pointer;
  color: rgb(68, 68, 68);
}
.day div {
  margin: 4px 0;
  padding: 0 4px;
}
span {
  font-size: 2rem;
  padding: 0 8px;
  padding-top: 14px;
}
.first,
.second {
  display: flex;
}
.first h4 {
  flex: 1;
}
.first h4:nth-child(1) {
  flex: 1.5;
}

p {
  text-align: center;
}
table {
  border-collapse: collapse;
  width: 100%;
}
td {
  /* border: 1px solid #dddddd; */
  text-align: center;
  padding: 2px;
}
td:nth-child(1) {
  text-align: left;
}
th {
  text-align: center;
  padding: 12px;
  background: #fff;
  border: 1px solid #dddddd;
}
input {
  width: 80px;
  height: 3rem;
}
textarea {
  width: 100%;
  outline: none;
  border: 1px solid rgb(179, 174, 174);
  font-size: 14px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  /* padding: 8px; */
}
button {
  padding: 6px;
  margin: 0 4px;
  outline: none;
  border: none;
  border-radius: 8%;
  cursor: pointer;
}
.red {
  background: lightcoral;
}
.green {
  background: #6ecb63;
}
</style>
