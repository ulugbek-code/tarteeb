<template>
  <div id="sign-in-wrapper">
    <div @click="toggleError" class="sign-in">
      <div class="form-img">
        <img src="../assets/SignInHat.svg" alt="" />
      </div>
      <h3>Log in to your account</h3>
      <form @submit.prevent="" class="form">
        <div class="input-container">
          <input
            v-model="userData.phoneNumber"
            @input="enforcePhoneFormat()"
            @keydown.enter="signIn"
            type="tel"
            required
          />
          <span>Phone number</span>
        </div>
        <div class="input-container">
          <input
            v-model.trim="userData.password"
            @keydown.enter="signIn"
            :type="typeOf"
            required
          />
          <span id="place">Password</span>
          <small @click.stop="toggleType">{{
            typeOf === "password" ? "show" : "hide"
          }}</small>
        </div>
        <p id="error" v-if="error">{{ error }}</p>
        <button @click="signIn" class="btn">Sign In</button>
      </form>
      <!-- <p>Don't have an account yet? <router-link to="/signUp">Sign Up</router-link></p> -->
    </div>
    <img class="back" src="../assets/SignInBG.svg" alt="" />
  </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      typeOf: "password",
      error: null,
      userData: {
        phoneNumber: "",
        password: "",
      },
    };
  },
  computed: {
    loginUser() {
      return this.$store.getters["loginUser"];
    },
    resolvedNumber() {
      return "998" + this.userData.phoneNumber.replace(/[() \s-]+/g, "");
    },
  },
  methods: {
    toggleError() {
      this.error = null;
    },
    toggleType() {
      if (this.typeOf === "password") {
        this.typeOf = "text";
      } else {
        this.typeOf = "password";
      }
    },
    enforcePhoneFormat() {
      let x = this.userData.phoneNumber
        .replace(/\D/g, "")
        .match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
      this.userData.phoneNumber = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      if (this.userData.phoneNumber.length > 11) {
        this.userData.phoneNumber =
          this.userData.phoneNumber.substring(0, 11) +
          "-" +
          this.userData.phoneNumber.substring(11);
      }
    },
    async signIn() {
      // console.log(this.resolvedNumber);
      if (this.userData.phoneNumber !== "" && this.userData.password !== "") {
        try {
          this.$Progress.start();
          const response = await axios.post(
            "https://time-tracker.azurewebsites.net/api/user/login",
            {
              phone: this.resolvedNumber, //"998914490133",
              password: this.userData.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          localStorage.setItem("loginUser", JSON.stringify(response.data));
          const token = await JSON.parse(localStorage.getItem("loginUser"));
          let decoded = jwt_decode(token.token);
          localStorage.setItem("decodedToken", JSON.stringify(decoded));

          this.$router.replace("/");
          this.$store.dispatch("changeAuth");
          // this.$forceUpdate();
          this.$Progress.finish();
        } catch (err) {
          this.error = err.response.data.title;
          this.$Progress.fail();
        }
      }
    },
  },
};
</script>

<style scoped>
#sign-in-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background: #fff; */
}
.sign-in {
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  border-radius: 25px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  padding: 3rem;
  padding-bottom: 1rem;
  z-index: 1;
  background: #fff;
}
.form-img {
  display: flex;
  justify-content: center;
}
.form-img img {
  width: 280px;
  height: 150px;
  margin-bottom: 0.2rem;
}
.sign-in h3 {
  color: rgb(34, 34, 34);
  text-align: center;
  font-family: "Poppins", "sans-serif";
  margin: 0.9rem 0 0.6rem;
}
.form {
  display: flex;
  flex-direction: column;
}
.form div {
  position: relative;
}
.warning {
  color: red;
}
.form input {
  width: 100%;
  margin: 0.6rem;
  padding: 0.6rem 1.2rem;
  border: 0.5px solid rgba(67, 97, 238, 0.35);
  border-radius: 50px;
  outline: rgba(67, 97, 238, 1);
  color: rgba(85, 85, 85, 1);
  font-family: "Poppins", "sans-serif";
  transition: all 0.4s ease;
}
.form input:hover {
  border: 0.5px solid rgba(67, 97, 238, 1);
}
.btn {
  width: 100%;
  background: #4361ee;
  margin: 0.7rem;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 50px;
  outline: none;
  color: #fff;
  cursor: pointer;
  font-family: "Poppins", "sans-serif";
  border: 1px solid rgba(67, 97, 238, 1);
}
.btn:hover {
  box-sizing: border-box;
  background: #fff;
  color: #4361ee;
}
.btn:active {
  box-shadow: 0 0px 2px #4361ee;
}
.sign-in p {
  margin: 0.7rem 0 0.3rem;
  font-size: 0.9rem;
  text-align: center;
  font-family: "Poppins", sans-serif;
}
.sign-in p a {
  color: #4361ee;
  text-decoration: none;
}
.back {
  position: absolute;
  bottom: 0;
  left: 50%;
  max-width: 60%;
  transform: translate(-50%, 0);
  z-index: 0;
}
.input-container span {
  color: rgba(68, 68, 68, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 28px;
  padding-top: 20px;
  font-size: 14px;
  transition: 0.6s ease-in-out;
  pointer-events: none;
}
.form input:focus ~ span,
.form input:valid ~ span {
  transform: translate(-20%, -70%);
  font-size: 12px;
}
#load {
  position: absolute;
  bottom: 10%;
  left: 50%;
  /* font-size: 30px; */
  /* margin:-60px 0 0 -60px; */
  display: inline-block;
  -webkit-animation: spin 1s linear infinite;
  -moz-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  /* background: #4361EE; */
}
small {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  position: absolute;
  right: 0;
  top: 35%;
  cursor: pointer;
}
#error {
  margin: 0;
  text-align: center;
  color: rgb(221, 78, 78);
}
</style>
