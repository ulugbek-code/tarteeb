import { createApp } from "vue";
import router from "./router.js";
import store from "./store/index.js";
import VueApexCharts from "vue3-apexcharts";
import BaseDialog from "./components/BaseDialog.vue";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueApexCharts);
app.component("base-dialog", BaseDialog);
app.mount("#app");
