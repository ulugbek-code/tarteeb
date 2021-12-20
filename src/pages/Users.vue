<template>
  <div id="users-container">
    <base-dialog
      v-if="isBtnClicked"
      title="Register new user"
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
        <div>
          <h2>Employees</h2>
          <input type="text" placeholder="Search" />
        </div>
        <div>
          <button @click="change('rejected')">Add Employee</button>
        </div>
      </div>
    </div>
    <div class="body-wrapper">
      <employees-list></employees-list>
      <employee-form></employee-form>
    </div>
  </div>
</template>

<script>
import EmployeesList from "../components/employees/EmployeesList.vue";
import EmployeeForm from "../components/employees/EmployeeForm.vue";

export default {
  components: {
    EmployeesList,
    EmployeeForm,
  },
  data() {
    return {
      isBtnClicked: false,
      isApprove: false,
      color: "green",
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
  width: 97%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.tasks-header div {
  display: flex;
}

.body-wrapper {
  display: flex;
  height: 90vh;
  width: 95%;
  margin: 0 auto;
}
</style>
