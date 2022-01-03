import { createApp } from "vue";
import router from "./router.js";
import store from "./store/index.js";
import VueApexCharts from "vue3-apexcharts";
import TheButton from "./components/UI/TheButton.vue";
import BaseDialog from "./components/BaseDialog.vue";
import BaseDropdown from "./components/BaseDropdown.vue";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueApexCharts);
app.component("the-button", TheButton);
app.component("base-dialog", BaseDialog);
app.component("base-dropdown", BaseDropdown);
app.mount("#app");
