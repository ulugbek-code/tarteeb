<template>
  <div id="main-chart-container">
    <div class="canvas">
      <apexchart type="area" :options="options" :series="seriesA"></apexchart>
    </div>
    <div class="widgets">
      <router-link class="box" to="/balanceSheet">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-report"
          width="34"
          height="34"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" />
          <path d="M18 14v4h4" />
          <path d="M18 11v-4a2 2 0 0 0 -2 -2h-2" />
          <rect x="8" y="3" width="6" height="4" rx="2" />
          <circle cx="18" cy="18" r="4" />
          <path d="M8 11h4" />
          <path d="M8 15h3" />
        </svg>
        Balance Sheet</router-link
      >
      <router-link class="box" to="/profitLoss">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-businessplan"
          width="34"
          height="34"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <ellipse cx="16" cy="6" rx="5" ry="3" />
          <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
          <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
          <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
          <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
          <path d="M5 15v1m0 -8v1" />
        </svg>
        Profit & Loss
      </router-link>
      <router-link class="box" to="/changesEquity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-layers-difference"
          width="34"
          height="34"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M16 16v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h2v-2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-2"
          />
          <polyline points="10 8 8 8 8 10" />
          <polyline points="8 14 8 16 10 16" />
          <polyline points="14 8 16 8 16 10" />
          <polyline points="16 14 16 16 14 16" />
        </svg>
        Changes on Equity</router-link
      >
      <router-link class="box" to="/cashFlow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-cash"
          width="34"
          height="34"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <rect x="7" y="9" width="14" height="10" rx="2" />
          <circle cx="14" cy="14" r="2" />
          <path
            d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2"
          />
        </svg>
        Cash Flow</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        chart: {
          toolbar: {
            show: false,
          },
          fontFamily: "Poppins, sans-serif",
        },
        colors: ["rgb(92, 96, 255)", "rgb(255, 106, 52)"],
        fill: {
          colors: ["#7e7", "rgb(255, 106, 52)"],
        },
        legend: {
          position: "top",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
          ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
      seriesA: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
    };
  },
};
</script>

<style scoped>
#main-chart-container {
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 1rem;
  background: rgba(241, 245, 251, 1);
  overflow: hidden;
  border-radius: 50px;
}
.canvas {
  width: 88%;
  margin: 3px auto;
  padding: 14px 0;
}
.widgets {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-width: 20%;
  max-width: 150px;
  min-height: 16vh;
  max-height: 140px;
  border-radius: 30px;
  background: #fff;
  transition: 0.4s all ease;
}
.box:hover {
  background: #bdd1e6;
}
a {
  text-decoration: none;
  color: #2c3e50;
  font-size: 13px;
}
</style>
