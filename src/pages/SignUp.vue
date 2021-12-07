<template>
  <div class="sign-up">
    <div class="left">
      <div class="left-header">
        <h2>Tarteeb</h2>
        <p>
          When you know how you spend your time, you can analyze your work
          trends and make smarter business decisions. Time tracking software can
          give you a complete overview of your work.
        </p>
      </div>
    </div>
    <div class="right">
      <form @submit.prevent class="form">
        <h2>Set up your account</h2>
        <div class="input-wrapper">
          <input type="text" required />
          <span>First Name</span>
        </div>
        <div class="input-wrapper">
          <input type="text" required />
          <span>Last Name</span>
        </div>
        <div class="input-wrapper">
          <input type="email" required />
          <span>Email</span>
        </div>
        <div class="input-wrapper">
          <input type="password" required />
          <span>Password</span>
        </div>
        <div class="input-wrapper">
          <input type="text" required />
          <span>Role</span>
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// import FirmsDropDown from "../UI/FirmsDropDown.vue";
// import BaseDropdown from "../UI/BaseDropdown.vue";

export default {
  //   components: { FirmsDropDown, BaseDropdown },
  data() {
    return {
      user: {
        country: "Uzbekistan",
      },
      countries: [],
      isValid: true,
      isEmailTouched: false,
      isPasswordTouched: false,
      isEmpty: false,
      userData: {
        firstName: "",
        lastName: "",
        userName: "",
        firm: "",
        phone: "",
        email: "",
        password: "",
      },
      position: [
        { name: "Admin", id: 0 },
        { name: "Auditor", id: 1 },
        { name: "Accountant", id: 2 },
        { name: "Accountant Assistant", id: 3 },
        { name: "Financial Officer", id: 4 },
      ],
      positionId: "",
      errorList: [],
    };
  },
  computed: {
    // getFirms() {
    //   return this.$store.getters["firm/getFirmsData"].map((firm) => {
    //     return {
    //       name: firm.name,
    //       id: firm.id,
    //     };
    //   });
    // },
    isEmailValid() {
      //eslint-disable-next-line
      return /^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/.test(
        this.userData.email
      );
    },
    isPasswordSecure() {
      //eslint-disable-next-line
      return new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,12})").test(
        this.userData.password
      );
    },
    isPasswordError() {
      return !this.isPasswordSecure && this.isPasswordTouched;
    },
    isEmailError() {
      return !this.isEmailValid && this.isEmailTouched;
    },
  },
  //   methods: {
  //     getCountryByUser() {
  //       axios
  //         .get("http://ip-api.com/json/")
  //         .then((res) => (this.user.country = res.data.country))
  //         .catch((err) => console.log(err));
  //     },
  //     getCountries() {
  //       axios
  //         .get("https://restcountries.com/v3.1/all")
  //         .then((res) => {
  //           this.countries = res.data.map((r) => r.name.common);
  //         })
  //         .catch((err) => console.log(err));
  //     },
  //     toggleValidity() {
  //       this.isValid = true;
  //       this.isEmpty = false;
  //     },
  //     typeSet(val) {
  //       this.user.userCountry = val;
  //     },
  //     getPositionId(val) {
  //       this.positionId = val;
  //     },
  //     async signUp() {
  //       if (
  //         this.isEmailValid &&
  //         this.isPasswordSecure &&
  //         this.userData.firstName.length !== 0 &&
  //         this.userData.lastName.length !== 0 &&
  //         this.userData.userName.length !== 0 &&
  //         this.userData.firm.length !== 0 &&
  //         this.userData.phone.length !== 0 &&
  //         this.positionId.length !== 0
  //       ) {
  //         console.log({
  //           firmId: this.userData.firm,
  //           firstName: this.userData.firstName,
  //           lastName: this.userData.lastName,
  //           email: this.userData.email,
  //           login: this.userData.userName,
  //           password: this.userData.password,
  //           telephone: this.userData.phone,
  //           role: this.positionId,
  //         });
  //         await axios
  //           .post("https://bspacedev.azurewebsites.net/api/Users/Register", {
  //             firmId: this.userData.firm,
  //             firstName: this.userData.firstName,
  //             lastName: this.userData.lastName,
  //             email: this.userData.email,
  //             login: this.userData.userName,
  //             password: this.userData.password,
  //             telephone: this.userData.phone,
  //             role: this.positionId,
  //           })
  //           .then((res) => {
  //             this.isValid = true;
  //             if (res.data.isValid) {
  //               // console.log(res.data.data)
  //               // console.log('success')
  //               this.$router.push("/signIn");
  //             } else {
  //               this.isValid = false;
  //               this.errorList = res.data.errors;
  //             }
  //           })
  //           .catch((e) => {
  //             console.log(e);
  //           });
  //       } else {
  //         this.isEmpty = true;
  //       }
  //     },
  //   },
  //   created() {
  //     this.getCountryByUser();
  //     this.getCountries();
  //   },
};
</script>

<style scoped>
.error {
  margin-left: 400px;
}
.sign-up {
  display: flex;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background: #fff;
}
.left,
.right {
  flex: 1;
}
.left {
  padding: 6rem 0 0 6rem;
  clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
  background: 16% url("../assets/left.png");
}
.left .left-header {
  width: 60%;
  color: #fff;
}
.left-header h2 {
  font-size: 26px;
}
.left-header p {
  font-size: 16px;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form {
  min-width: 360px;
  /* background: rgb(225, 71, 71); */
}
.form h2 {
  text-align: center;
}
.input-wrapper {
  position: relative;
}
.input-wrapper.dd {
  margin: 9px 0;
}
input {
  width: 100%;
  margin: 0.6rem 0;
  padding: 0.6rem 1rem;
  border: 0.5px solid rgba(67, 97, 238, 0.35);
  border-radius: 50px;
  outline: rgba(67, 97, 238, 1);
  color: rgb(119, 113, 113);
  font-family: "Poppins", "sans-serif";
}
button {
  width: 100%;
  background: rgba(91, 24, 225, 1);
  margin: 0.7rem 0;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 50px;
  outline: none;
  color: #fff;
  cursor: pointer;
  font-family: "Poppins", "sans-serif";
  transition: 0.3s;
  border: 1px solid rgba(91, 24, 225, 1);
}
button:hover {
  background: transparent;
  color: rgba(91, 24, 225, 1);
}
button:focus {
  background: rgba(91, 24, 225, 0.5);
}
span {
  color: rgba(68, 68, 68, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 20px;
  padding-top: 20px;
  font-size: 13px;
  transition: 0.6s ease-in-out;
  pointer-events: none;
}
.form input:focus ~ span,
.form input:valid ~ span {
  transform: translate(-20%, -70%);
  font-size: 12px;
}
</style>
