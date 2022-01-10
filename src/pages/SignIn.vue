<template>
  <div class="sign-in">
    <div class="form-img">
      <img src="../assets/SignInHat.svg" alt="" />
    </div>
    <h3>Log in to your account</h3>
    <form @submit.prevent="signIn" class="form">
      <div class="input-container">
        <input
          v-model="phoneNumber"
          @input="enforcePhoneFormat()"
          type="tel"
          required
        />
        <span>Phone number</span>
      </div>
      <div class="input-container">
        <input v-model.trim="password" type="password" required />
        <span>Password</span>
      </div>
      <button class="btn">Sign In</button>
    </form>
    <!-- <p>Don't have an account yet? <router-link to="/signUp">Sign Up</router-link></p> -->
  </div>
  <img class="back" src="../assets/SignInBG.svg" alt="" />
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      phoneNumber: "",
      password: "",
    };
  },
  methods: {
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
    signIn() {
      // const str = JSON.stringify({ login: "998914490133", password: "test" });
      // const headers = {
      //   "Content-Type": "application/json;charset=UTF-8",
      //   "Access-Control-Allow-Origin": "*",
      // };
      console.log(this.password, this.phoneNumber);
      axios
        .post(
          "https://time-tracker.azurewebsites.net/api/user/login",
          {
            login: "998914490133",
            password: "test",
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              accept: "*/*",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
    },
  },
  async mounted() {
    await this.signIn();
  },
};
</script>

<style scoped>
.sign-in {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
div.invalid input {
  border: 1px solid red;
  margin-bottom: 30px;
}
div.invalid span,
div.invalid small {
  color: red;
}
div.invalid small {
  position: absolute;
  bottom: 0;
  left: 25%;
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
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(-360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(-360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
</style>
