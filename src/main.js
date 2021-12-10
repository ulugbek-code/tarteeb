import { createApp } from "vue";
import router from "./router.js";
import VueApexCharts from "vue3-apexcharts";
import BaseDialog from "./components/BaseDialog.vue";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(VueApexCharts);
app.component("base-dialog", BaseDialog);
app.mount("#app");
