import { createApp } from "vue";
import router from "./router.js";
import TheNavigation from "./components/TheNavigation.vue";
import store from "./store/index.js";
import VueApexCharts from "vue3-apexcharts";
import VueProgressBar from "@aacassandra/vue3-progressbar";
import TheButton from "./components/UI/TheButton.vue";
import BaseDialog from "./components/BaseDialog.vue";
import BaseDropdown from "./components/BaseDropdown.vue";
import App from "./App.vue";

const options = {
  color: "#4361ee",
  failedColor: "#FF2511",
  thickness: "3px",
  transition: {
    speed: "0.2s",
    opacity: "0.5s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};

const app = createApp(App);
app.use(VueApexCharts);
app.use(router);
app.use(store);
app.use(VueProgressBar, options);
app.component("the-navigation", TheNavigation);
app.component("the-button", TheButton);
app.component("base-dialog", BaseDialog);
app.component("base-dropdown", BaseDropdown);
app.mount("#app");
