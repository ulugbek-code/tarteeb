<template>
  <div>
    <base-dialog :show="isLogOut" color="#fff" width="580px" @close="close">
      <template #default>
        <form class="form-deleting">
          <h4>Do you really want to log out</h4>
        </form>
      </template>
      <template #actions>
        <div class="btn-wrapper">
          <the-button @click="deleteToken" :red="true" class="form-btn"
            >Log out</the-button
          >
          <the-button @click="close" class="form-btn">Cancel</the-button>
        </div>
      </template>
    </base-dialog>
    <nav :class="!isNavOpened ? 'openedSideBar' : ''">
      <div
        @click="toggleHamburgerMenu"
        :class="[!isNavOpened ? 'open' : '']"
        class="hamburger-menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <router-link to="/"
        ><h1>{{ companyName }}</h1></router-link
      >
      <div v-if="decoded" class="info">
        <img src="../assets/unknown.png" alt="" />
        <div class="sub-info">
          <h3>
            {{ decoded ? decoded.given_name : "Firstname" }}
            {{ decoded ? decoded.unique_name.substr(0, 1) : "L" }}.
          </h3>
          <p>{{ decoded ? decoded.role : "Admin" }}</p>
        </div>
      </div>
      <div class="nav-li">
        <router-link
          v-if="decoded ? decoded.role === 'Manager' : null"
          class="nav-link"
          to="/users"
        >
          <div @click="offseting" class="items">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icons"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#aaa"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="9" cy="7" r="4" />
              <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
            </svg>
            <p>Employees</p>
          </div>
        </router-link>
        <router-link class="nav-link" to="/">
          <div @click="offseting" class="items">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icons"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#aaa"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5"
              />
              <path
                d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z"
              />
              <path d="M16 7h4" />
            </svg>
            <span class="tooltiptext">Tasks</span>
            <p>Tasks</p>
          </div>
        </router-link>
        <router-link class="nav-link" to="/records">
          <div @click="offseting" class="items">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icons"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#aaa"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x="3" y="12" width="6" height="8" rx="1" />
              <rect x="9" y="8" width="6" height="12" rx="1" />
              <rect x="15" y="4" width="6" height="16" rx="1" />
              <line x1="4" y1="20" x2="18" y2="20" />
            </svg>
            <span class="tooltiptext">Time</span>
            <p>Time</p>
          </div>
        </router-link>
        <a class="nav-link" href="http://Loom.com" target="_blank">
          <div @click="offseting" class="items">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icons"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#aaa"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="1" />
              <line x1="13.41" y1="10.59" x2="16" y2="8" />
              <path d="M7 12a5 5 0 0 1 5 -5" />
            </svg>
            <span class="tooltiptext">Loom</span>
            <p>Loom</p>
          </div>
        </a>
      </div>
      <div @click="logOut" class="log-out items">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icons"
          width="20"
          height="20"
          viewBox="0 0 24 20"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
          />
          <path d="M7 12h14l-3 -3m0 6l3 -3" />
        </svg>
        <span class="tooltiptext">Log Out</span>
        <p>Log out</p>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      isLogOut: false,
    };
  },
  computed: {
    companyName() {
      if (this.isNavOpened) {
        return "Tarteeb";
      } else {
        return "TT";
      }
    },
    decoded() {
      // return JSON.parse(localStorage.getItem("decodedToken"));
      return this.$store.state.decodedUser;
    },
    isNavOpened() {
      return this.$store.getters.isNavOpened;
    },
  },
  methods: {
    toggleHamburgerMenu() {
      this.$store.dispatch("toggleNavbar");
    },
    close() {
      this.isLogOut = false;
    },
    logOut() {
      this.isLogOut = true;
    },
    deleteToken() {
      localStorage.clear();
      this.close();
      this.$store.commit("clearState");
    },
  },
};
</script>

<style scoped>
.tooltiptext {
  visibility: hidden;
  background-color: rgb(99, 101, 111);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 3px;
  width: fit-content;
  position: absolute;
  top: -10%;
  left: 50%;
  z-index: 1;
}
#marker {
  position: absolute;
  left: -10%;
  height: 30px;
  width: 4.5px;
  background: rgba(67, 97, 238, 1);
  transition: 0.4s;
  border-radius: 4px;
  /* padding-bottom: 5px; */
}
nav {
  height: 100%;
  width: 270px;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  /* overflow-x: hidden; */
  background: rgba(19, 23, 40, 1);
  padding-left: 1.5rem;
  transition: all 0.4s ease;
}
.nav-li {
  position: relative;
  animation: coming 0.4s ease;
}
nav.openedSideBar {
  width: 110px;
}
nav p,
.sub-info {
  position: absolute;
  left: 20%;
  transition: all 0.5s ease;
  /* animation: slide 1s forwards; */
}
nav.openedSideBar p,
nav.openedSideBar .sub-info {
  display: none;
}
nav.openedSideBar .items,
nav.openedSideBar h1 {
  display: flex;
  justify-content: center;
}
nav.openedSideBar .items:hover .tooltiptext {
  visibility: visible;
}
nav.openedSideBar .log-out {
  left: 22%;
}
nav.openedSideBar .hamburger-menu {
  margin-left: 1rem;
}
nav.openedSideBar #marker {
  display: none;
}
.hamburger-menu {
  margin: 1rem 0 2rem;
  width: 35px;
  height: 28px;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
}
.hamburger-menu span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: #fff;
  border-radius: 2.5px;
  opacity: 1;
  left: 10%;
  transition: 0.25s ease-in-out;
}
.hamburger-menu span:nth-child(1) {
  top: 0px;
}

.hamburger-menu span:nth-child(2) {
  top: 10px;
}
.hamburger-menu span:nth-child(3) {
  top: 20px;
}
.hamburger-menu.open span:nth-child(1) {
  width: 80%;
}
.hamburger-menu.open span:nth-child(2) {
  width: 60%;
}
.hamburger-menu.open span:nth-child(3) {
  width: 40%;
}
nav h1 {
  font-size: 26px;
  letter-spacing: 1.2px;
  color: #fff;
  margin-right: 1rem;
}
.info {
  position: relative;
  display: flex;
  justify-content: flex-start;
  margin: 2rem 1rem 2rem 0;
}
.info img {
  position: relative;
  height: 70px;
  width: 70px;
  border: 1px solid #333;
  background: rgba(255, 254, 254, 0.9);
  border-radius: 50%;
  z-index: 9;
}
.sub-info {
  top: 15%;
  width: 100%;
  left: 30%;
  margin-left: 1rem;
}
.sub-info h3 {
  position: absolute;
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  margin-bottom: 5px;
  overflow: hidden;
}
.sub-info p {
  top: 24px;
  left: 0;
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
  font-weight: 300;
  /* background: aqua; */
}
.icons {
  position: relative;
  color: rgba(170, 170, 170, 0.7);
  font-size: 18px;
  width: 20px;
  margin-right: 1.5rem;
  margin-bottom: 2px;
}
.svg-icons {
  stroke: chocolate;
}
.items {
  display: flex;
  align-items: center;
  position: relative;
  font-size: 16px;
  margin: 1rem 0;
  font-weight: 300;
  /* overflow: hidden; */
}
.log-out {
  width: 80%;
  position: absolute;
  bottom: 5%;
  left: 10%;
  color: rgba(255, 185, 62, 1);
  font-weight: 300;
  cursor: pointer;
  /* background: chartreuse; */
  /* animation: coming 0.6s ease; */
}
.log-out .icons {
  stroke: rgba(255, 185, 62, 1);
}
a {
  text-decoration: none;
  cursor: pointer;
  color: rgba(170, 170, 170, 0.5);
  font-family: "Poppins", sans-serif;
}
a.active {
  color: #fff;
}
a:hover,
a:active,
a.router-link-active,
.items:hover > .icons,
.log-out:hover,
a.router-link-active .icons {
  color: #fff;
  stroke: #fff;
}
.btn-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}
.btn-wrapper button {
  margin: 0 8px;
}

/* @keyframes coming {
  0% {
    transform: translateX(-150%);
  }
  100% {
    transform: translateX(0);
  }
} */
/* @keyframes slide {
  100% {
    left: 0;
  }
} */
</style>
