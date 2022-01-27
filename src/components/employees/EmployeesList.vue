<template>
  <div id="emp-list">
    <div class="list-header">
      <h2>Employees</h2>
      <div class="search-input">
        <img src="../../assets/search.png" alt="" />
        <input v-model="search" type="text" placeholder="Search..." />
      </div>
    </div>
    <table>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Phone</th>
        <!-- <th>Month</th> -->
      </tr>
      <employee-each-list
        :search="search"
        :users="finalUsers"
        @sendUser="getSentUser"
      ></employee-each-list>
    </table>
  </div>
</template>

<script>
import EmployeeEachList from "./EmployeeEachList.vue";
export default {
  emits: ["sendUser2"],
  components: {
    EmployeeEachList,
  },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    finalUsers() {
      const users = this.$store.getters.users;
      return users.map((user) => {
        let returnValue = { ...user };
        returnValue.phone = this.enforcePhoneFormat(user.phone.substr(3));
        return returnValue;
      });
    },
  },
  methods: {
    enforcePhoneFormat(number) {
      let x = number.replace(/\D/g, "").match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
      number = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      if (number.length > 11) {
        return (number = number.substring(0, 11) + "-" + number.substring(11));
      }
      return number;
    },
    getSentUser(id, monthId) {
      this.$emit("sendUser2", id, monthId);
    },
  },
  async created() {
    this.$Progress.start();
    await this.$store.dispatch("getUsers");
  },
  mounted() {
    this.$Progress.finish();
  },
};
</script>

<style scoped>
#emp-list {
  color: rgb(68, 68, 68);
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
th {
  text-align: center;
  padding: 12px;
  background: #fff;
}
th {
  color: rgb(68, 68, 68);
}
tr:not(:nth-child(1)):hover {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>
