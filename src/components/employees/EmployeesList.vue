<template>
  <div id="emp-list">
    <div class="list-header">
      <h2>Employees</h2>
      <div class="search-input">
        <img src="../../assets/search.png" alt="" />
        <input type="text" placeholder="Search..." />
      </div>
    </div>
    <table>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Month</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.firstname }} {{ user.lastname }}</td>
        <td>(90)990-09-09</td>
        <td>December</td>
        <td id="last-td"><span>trash</span><span>edit</span></td>
        <!-- <td width="15%">
        <router-link to="/list"><button>Generate report</button></router-link>
      </td>
      <td width="15%">
        <button @click="change('approve')">Approve</button>
      </td>
      <td width="15%"><button @click="change('reject')">Reject</button></td> -->
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          id: 0,
          firstname: "John",
          lastname: "Doe",
          email: "admin@tt.uz",
          password: "adminPassword",
          role: 0,
        },
        {
          id: 1,
          firstname: "Joanne",
          lastname: "Doe",
          email: "worker@tt.uz",
          password: "workerPassword",
          role: 1,
        },
        {
          id: 2,
          firstname: "string",
          lastname: "string",
          email: "string",
          password: "string",
          role: 1,
        },
        {
          id: 3,
          firstname: "john",
          lastname: "doe",
          email: "johndoe@gmail.com",
          password: "john1999",
          role: 0,
        },
        {
          id: 4,
          firstname: "john",
          lastname: "doe",
          email: "johndoe@gmail.com",
          password: "john1999",
          role: 0,
        },
        {
          id: 5,
          firstname: "test",
          lastname: "test",
          email: "test",
          password: "tste",
          role: 0,
        },
      ],
    };
  },
};
</script>

<style scoped>
#emp-list {
  flex: 1;
  padding-right: 1rem;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 16px 12px 16px;
}
.search-input {
  position: relative;
}
.search-input img {
  position: absolute;
  left: 3%;
  top: 7px;

  height: 16px;
}
.search-input input {
  width: 100%;
  padding: 4px 32px;
  border: 0.5px solid rgba(67, 97, 238, 0.35);
  border-radius: 50px;
  outline: rgba(67, 97, 238, 1);
  color: rgba(85, 85, 85, 1);
  font-family: "Poppins", "sans-serif";
  transition: all 0.4s ease;
}
.search-input input:hover {
  border: 0.5px solid rgba(67, 97, 238, 1);
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 10px;
}
tr {
  border-radius: 24px;
}
td {
  text-align: center;
  padding: 8px;
  font-size: 14px;
}
td:not(:nth-child(1)) {
  cursor: pointer;
}
th {
  text-align: center;
  padding: 12px;
  background: #fff;
}
th,
td {
  color: rgb(68, 68, 68);
}
button {
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  color: rgb(30, 30, 30);
}
tr:not(:nth-child(1)):hover {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
#last-td {
  display: flex;
  flex-direction: column;
}
</style>
