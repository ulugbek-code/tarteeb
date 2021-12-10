<template>
  <div id="users-container">
    <base-dialog
      v-if="isBtnClicked"
      :title="title"
      @close="close"
      :color="color"
    >
      <template #default>
        <div v-if="isApprove">
          <span class="tick">&#10004;</span>
        </div>
        <div v-else>
          <span class="exit">&#215; </span>
        </div>
      </template>
    </base-dialog>
    <div class="header-wrapper">
      <div class="tasks-header">
        <h2>Users</h2>
      </div>
    </div>
    <div class="body-wrapper">
      <table>
        <tr>
          <th>Name</th>
          <th>Month</th>
          <th colspan="3">Action</th>
        </tr>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstname }} {{ user.lastname }}</td>
          <td>December</td>
          <td width="15%">
            <router-link to="/records"
              ><button>Generate report</button></router-link
            >
          </td>
          <td width="15%">
            <button @click="change('approve')">Approve</button>
          </td>
          <td width="15%"><button @click="change('reject')">Reject</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBtnClicked: false,
      isApprove: false,
      color: "green",
      title: "Approved",
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
  methods: {
    change(payload) {
      if (payload == "approve") {
        this.title = "Approved";
        this.color = "green";
        this.isApprove = true;
      } else {
        this.title = "Rejected";
        this.color = "red";
        this.isApprove = false;
      }
      this.isBtnClicked = true;
    },
    close() {
      this.isBtnClicked = false;
    },
  },
};
</script>

<style scoped>
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
  padding: 10px;
}
td:nth-child(3) {
  padding: 0;
  background: #5c7aea;
  cursor: pointer;
}
td:nth-child(4) {
  padding: 0;
  background: #6ecb63;
  cursor: pointer;
}
td:nth-child(5) {
  padding: 0;
  background: #ff5c58;
  cursor: pointer;
}
th {
  text-align: center;
  padding: 12px;
  background: #fff;
  border: 1px solid #dddddd;
}
button {
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  color: rgb(30, 30, 30);
}
.tick {
  color: #6ecb63;
  font-size: 2rem;
  padding: 8px 24px;
  border: 1px solid #6ecb63;
  border-radius: 50%;
}
.exit {
  color: #ff5c58;
  font-size: 2rem;
  padding: 8px 24px;
  border: 1px solid #ff5c58;
  border-radius: 50%;
}
</style>
