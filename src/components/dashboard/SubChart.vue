<template>
  <div id="sub-chart-container">
    <div class="canvas-chart">
      <apexchart type="line" :options="options" :series="series"></apexchart>
    </div>
    <div class="assets">
      <h3>All ASSETS</h3>
      <div class="assets-box">
        <div class="assets-container">
          <p class="a-header">Monthly</p>
          <p class="a-body">$ 4,019k</p>
        </div>
        <div class="assets-container">
          <p class="a-header">Quarterly</p>
          <p class="a-body">$ 10,115k</p>
        </div>
        <div class="assets-container">
          <p class="a-header">Monthly</p>
          <p class="a-body">$ 4,019k</p>
        </div>
        <div class="assets-container">
          <p class="a-header">Annually</p>
          <p class="a-body">$ 57,954k</p>
        </div>
        <div class="assets-container">
          <p class="a-header">Total</p>
          <p class="a-body">$ 97,590k</p>
        </div>
      </div>
    </div>
    <hr />
    <div class="canvas">
      <apexchart type="donut" :options="options" :series="seriesA"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        chart: {
          // zoom: {
          //   enabled: false
          // },
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
      seriesA: [44, 55],
    };
  },
};
</script>

<style scoped>
hr {
  width: 90%;
  margin: 2px auto 0;
  border: 0;
  height: 1px;
  background: rgba(221, 221, 221, 1);
}
#sub-chart-container {
  box-sizing: border-box;
  width: 32%;
  background: rgba(241, 245, 251, 1);
  padding: 1.2rem;
  border-radius: 50px;
}
.canvas-chart {
  background: #fff;
  border-radius: 30px;
  margin-bottom: 8px;
}
.assets-box {
  display: flex;
  justify-content: space-between;
}
h3 {
  padding-left: 4px;
}
.assets-container {
  display: flex;
  flex-direction: column;
  padding: 4px;
  font-size: 12px;
}
.a-header {
  color: rgba(155, 155, 155, 1);
  font-size: 12px;
}
.a-body {
  color: rgba(116, 101, 190, 1);
  font-size: 15px;
}
</style>
