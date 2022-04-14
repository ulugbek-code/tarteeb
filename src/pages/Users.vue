<template>
  <div>
    <div :class="[!isNavOpened ? 'nav' : '']" id="users-container">
      <base-dialog
        :show="isBtnClicked"
        title="Register new user"
        width="580px"
        color="	#dddddd"
        @close="close"
      >
        <template #default>
          <div>
            <form class="form-reg">
              <div class="input-container">
                <input
                  v-model.trim="firstName"
                  @click="isEmpty = false"
                  type="text"
                  required
                />
                <span>Firstname</span>
                <transition name="dialog">
                  <small v-if="isEmpty && !firstName"
                    >Please fill the field</small
                  >
                </transition>
              </div>
              <div class="input-container">
                <input
                  v-model.trim="lastName"
                  @click="isEmpty = false"
                  type="text"
                  required
                />
                <span>Lastname</span>
                <transition name="dialog">
                  <small v-if="isEmpty && !lastName"
                    >Please fill the field</small
                  >
                </transition>
              </div>
              <div class="input-container">
                <input
                  v-model.trim="phoneNumber"
                  @input="enforcePhoneFormat()"
                  @click="isEmpty = false"
                  type="tel"
                  required
                />
                <span>Phone number</span>
                <transition name="dialog">
                  <small v-if="isEmpty && !phoneNumber"
                    >Please fill the field</small
                  >
                  <small v-else-if="isEmpty && phoneNumber.length < 14"
                    >Invalid phone number</small
                  >
                </transition>
              </div>
              <div class="input-container">
                <input
                  v-model.trim="dateOfBirth"
                  @click="isEmpty = false"
                  class="date"
                  type="date"
                  required
                />
                <transition name="dialog">
                  <small v-if="isEmpty && !dateOfBirth"
                    >Please fill the field</small
                  >
                </transition>
              </div>
            </form>
          </div>
        </template>
        <template #actions>
          <button @click="register" class="form-btn">Register</button>
          <button @click="close" class="form-btn">Cancel</button>
        </template>
      </base-dialog>
      <div class="body-wrapper">
        <employees-list @sendUser2="getUser"></employees-list>
        <employee-form
          :userId="whichUserId"
          :month="whichMonth"
          @addEmp="change"
        ></employee-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
      isEmpty: false,
      whichUserId: null,
      whichMonth: null,
      firstName: null,
      lastName: null,
      phoneNumber: "",
      dateOfBirth: null,
    };
  },
  computed: {
    isNavOpened() {
      return this.$store.getters.isNavOpened;
    },
    resolvedNumber() {
      if (this.phoneNumber) {
        return "998" + this.phoneNumber.replace(/[() \s-]+/g, "");
      }
      return null;
    },
  },
  methods: {
    change() {
      this.isBtnClicked = true;
    },
    close() {
      this.isBtnClicked = false;
      this.isEmpty = false;
      this.firstName = null;
      this.lastName = null;
      this.phoneNumber = "";
      this.dateOfBirth = null;
    },
    getUser(val1, val2) {
      this.whichUserId = val1;
      this.whichMonth = val2;
    },
    enforcePhoneFormat() {
      let x = this.phoneNumber
        .replace(/\D/g, "")
        .match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
      this.phoneNumber = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      if (this.phoneNumber.length > 11) {
        this.phoneNumber =
          this.phoneNumber.substring(0, 11) +
          "-" +
          this.phoneNumber.substring(11);
      }
    },
    async register() {
      const obj = {
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.resolvedNumber,
        birthDate: this.dateOfBirth,
      };
      if (
        this.firstName &&
        this.lastName &&
        this.phoneNumber.length > 13 &&
        this.dateOfBirth
      ) {
        this.$Progress.start();
        await axios.post(
          "https://tarteeb.azurewebsites.net/api/user/register",
          obj,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginUser")).token
              }`,
            },
          }
        );
        await this.$store.dispatch("getUsers");
        this.$Progress.finish();
        this.close();
      } else {
        this.isEmpty = true;
      }
    },
  },
};
</script>

<style scoped>
#users-container {
  transition: all 0.4s ease;
  margin-left: 270px;
}
#users-container.nav {
  margin-left: 110px;
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
  align-items: center;
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
  color: #444;
  transition: all 0.4s ease;
}
.form-reg small {
  position: absolute;
  top: 30%;
  left: 103%;
  width: 100%;
  color: rgb(213, 70, 70);
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
.date {
  color: rgba(68, 68, 68, 0.8);
}
.date::-webkit-calendar-picker-indicator {
  cursor: pointer;
}
.input-container span {
  color: rgba(68, 68, 68, 0.8);
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
  /* color: #fff; */
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.35s ease;
}
</style>
