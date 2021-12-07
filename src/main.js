import { createApp } from "vue";
import router from "./router.js";
import VueApexCharts from "vue3-apexcharts";
import TheNavigation from "./components/TheNavigation.vue";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(VueApexCharts);
app.component("the-navigation", TheNavigation);
app.mount("#app");
