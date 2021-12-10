<template>
  <!-- <the-navigation></the-navigation> -->
  <div class="box">
    <div id="header-dashboard">
      <div class="header-box">
        <h2>Welcome Back, {{ user.firstName }}</h2>
        <p>Dashboard</p>
      </div>
      <div class="filtering-box">
        <p>3Q - 4Q | 2021 Year</p>
      </div>
      <div class="settings"></div>
    </div>
    <div id="charts-container">
      <main-chart></main-chart>
      <sub-chart></sub-chart>
    </div>
  </div>
</template>

<script>
import MainChart from "../components/dashboard/MainChart.vue";
import SubChart from "../components/dashboard/SubChart.vue";

export default {
  components: {
    MainChart,
    SubChart,
  },
  data() {
    return {
      user: {},
      isNavOpened: true,
    };
  },
};
</script>

<style scoped>
.box {
  margin-left: 270px;
  transition: all 0.6s ease;
}
.box.nav {
  margin-left: 110px;
}
#header-dashboard {
  width: 94%;
  margin: 1rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#charts-container {
  display: flex;
  justify-content: space-between;
  width: 94%;
  margin: 0 auto;
  /* background: chartreuse; */
}
.settings {
  display: flex;
}
.download {
  background: rgba(237, 237, 237, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 27px;
  width: 28px;
  border-radius: 40px;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
}
.download-icon {
  border-radius: 50%;
  color: rgba(170, 170, 170, 1);
}
</style>
