<template>
  <base-dialog v-if="isLogOut" color="#fff" width="480px" @close="close">
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
    <div class="info">
      <img src="../assets/unknown.png" alt="" />
      <div class="sub-info">
        <h3>John Doe</h3>
        <p>Admin</p>
      </div>
    </div>
    <div class="nav-li">
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
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="1" />
            <line x1="13.41" y1="10.59" x2="16" y2="8" />
            <path d="M7 12a5 5 0 0 1 5 -5" />
          </svg>
          <p>Dashboard</p>
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
          <p>Time</p>
        </div>
      </router-link>
      <router-link class="nav-link" to="/tasks">
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
          <p>Tasks</p>
        </div>
      </router-link>
      <router-link class="nav-link" to="/users">
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
      <router-link class="nav-link" to="/settings">
        <div @click="offseting" class="items">
          <svg
            class="icons"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke="#aaa"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6156 4.67675C12.0949 2.77442 14.9051 2.77442 15.3844 4.67675C15.4563 4.96253 15.5972 5.22793 15.7958 5.45133C15.9944 5.67474 16.2449 5.84984 16.527 5.96239C16.8091 6.07494 17.1148 6.12176 17.4193 6.09902C17.7237 6.07629 18.0183 5.98466 18.279 5.83158C20.0149 4.81325 22.0028 6.72642 20.9453 8.39908C20.7865 8.65004 20.6915 8.93353 20.668 9.2265C20.6444 9.51948 20.693 9.81367 20.8097 10.0852C20.9265 10.3567 21.1081 10.5978 21.3398 10.789C21.5716 10.9802 21.8469 11.116 22.1434 11.1854C24.1189 11.6469 24.1189 14.3531 22.1434 14.8146C21.8466 14.8838 21.571 15.0196 21.339 15.2108C21.107 15.402 20.9252 15.6432 20.8083 15.9149C20.6914 16.1865 20.6428 16.4809 20.6664 16.7741C20.69 17.0673 20.7852 17.3509 20.9441 17.602C22.0016 19.2736 20.0149 21.1878 18.2779 20.1695C18.0173 20.0166 17.7229 19.9252 17.4186 19.9025C17.1144 19.8798 16.8089 19.9266 16.5269 20.039C16.245 20.1514 15.9946 20.3263 15.7961 20.5495C15.5975 20.7726 15.4565 21.0377 15.3844 21.3233C14.9051 23.2256 12.0949 23.2256 11.6156 21.3233C11.5437 21.0375 11.4028 20.7721 11.2042 20.5487C11.0056 20.3253 10.7551 20.1502 10.473 20.0376C10.1909 19.9251 9.88519 19.8782 9.58074 19.901C9.27629 19.9237 8.98172 20.0153 8.721 20.1684C6.98512 21.1868 4.99725 19.2736 6.05475 17.6009C6.21349 17.35 6.30849 17.0665 6.33204 16.7735C6.35559 16.4805 6.30702 16.1863 6.19028 15.9148C6.07354 15.6433 5.89192 15.4022 5.66018 15.211C5.42845 15.0198 5.15313 14.884 4.85663 14.8146C2.88112 14.3531 2.88112 11.6469 4.85663 11.1854C5.1534 11.1162 5.429 10.9804 5.661 10.7892C5.893 10.598 6.07484 10.3568 6.19171 10.0851C6.30859 9.81347 6.35721 9.51907 6.3336 9.2259C6.31 8.93273 6.21484 8.64907 6.05587 8.398C4.99837 6.72642 6.98512 4.81217 8.72212 5.8305C9.84712 6.48917 11.3051 5.90633 11.6156 4.67675Z"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
            <path
              d="M13.5 16.25C15.364 16.25 16.875 14.7949 16.875 13C16.875 11.2051 15.364 9.75 13.5 9.75C11.636 9.75 10.125 11.2051 10.125 13C10.125 14.7949 11.636 16.25 13.5 16.25Z"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
          </svg>
          <p>Settings</p>
        </div>
      </router-link>
      <!-- <div :style="{ top: getOffset + 'px' }" id="marker"></div> -->
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
      <p>Log Out</p>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      isLogOut: false,
      haveAuth: null,
      // isNavOpened: true,
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
      localStorage.removeItem("loginUser");
      this.close();
      this.$router.replace("/signIn");
    },
  },
};
</script>

<style scoped>
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
  overflow-x: hidden;
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
  transition: all 0.2s ease;
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
nav.openedSideBar .log-out {
  left: 40%;
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
  left: 0;
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
.hamburger-menu.open span:nth-child(3) {
  width: 70%;
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
  left: 40%;
  margin-left: 1rem;
}
.sub-info h3 {
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  margin-bottom: 5px;
}
.sub-info p {
  left: 10%;
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
  font-size: 16px;
  margin: 1rem 0;
  font-weight: 300;
  overflow: hidden;
}
.log-out {
  width: 80%;
  position: absolute;
  bottom: 5%;
  left: 10%;
  color: rgba(255, 185, 62, 1);
  font-weight: 300;
  cursor: pointer;
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
