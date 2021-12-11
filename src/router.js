import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "./pages/Dashboard.vue";
import Records from "./pages/Records.vue";
import RecordsList from "./pages/RecordsList.vue";
import Tasks from "./pages/Tasks.vue";
import Users from "./pages/Users.vue";
import SignUp from "./pages/SignUp.vue";
import SignIn from "./pages/SignIn.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Dashboard },
    { path: "/users", component: Users },
    { path: "/tasks", component: Tasks },
    { path: "/records", component: Records },
    { path: "/list", component: RecordsList },
    { path: "/SignUp", component: SignUp },
    { path: "/SignIn", component: SignIn },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
