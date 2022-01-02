<template>
  <div id="users-container">
    <base-dialog
      v-if="isBtnClicked"
      title="Register new user"
      color="#1a1e33"
      @close="close"
    >
      <template #default>
        <div>
          <form class="form-reg">
            <div class="input-container">
              <input v-model.trim="firstName" type="text" required />
              <span>Firstname</span>
            </div>
            <div class="input-container">
              <input v-model.trim="lastName" type="text" required />
              <span>Lastname</span>
            </div>
            <div class="input-container">
              <input v-model.trim="phoneNumber" type="tel" required />
              <span>Phone number</span>
            </div>
            <div class="input-container">
              <input
                v-model.trim="dateOfBirth"
                class="date"
                type="date"
                required
              />
              <!-- <span>Date of birth</span> -->
            </div>
          </form>
        </div>
      </template>
      <template #actions>
        <button class="form-btn">Register</button>
        <button @click="close" class="form-btn">Cancel</button>
      </template>
    </base-dialog>
    <div class="body-wrapper">
      <employees-list></employees-list>
      <employee-form @addEmp="change"></employee-form>
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
    };
  },
  methods: {
    change() {
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
.body-wrapper {
  display: flex;
  height: 90vh;
  width: 95%;
  margin: 0 auto;
}
.form-reg {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.form-reg * {
  font-family: "Poppins";
}
.form-reg input {
  margin: 10px 0;
  padding: 6px 16px;
  width: 250px;
  height: 32px;
  border-radius: 20px;
  border: none;
  outline: none;
}
.form-btn {
  font-family: "Poppins", sans-serif;
  color: #fff;
  font-weight: 500;
  background: rgba(76, 175, 80, 1);
  transition: all 0.2s ease;
  padding: 4px 10px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
}
.form-btn:nth-child(2) {
  background: brown;
  margin-left: 4px;
}
.form-btn:hover {
  background: rgba(76, 175, 80, 0.7);
}
.form-btn:nth-child(2):hover {
  background: rgba(165, 42, 42, 0.7);
}
.input-container {
  position: relative;
}

.date::-webkit-calendar-picker-indicator {
  cursor: pointer;
}
.input-container span {
  color: rgba(68, 68, 68, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 16px;
  padding-top: 16px;
  font-size: 14px;
  transition: 0.6s ease-in-out;
  pointer-events: none;
}
.form-reg input:focus ~ span,
.form-reg input:valid ~ span {
  transform: translate(-20%, -70%);
  font-size: 12px;
  color: #fff;
}
</style>
