import { createRouter, createWebHistory } from "vue-router";

// import Dashboard from "./pages/Dashboard.vue";
// import Records from "./pages/Records.vue";
// import RecordsList from "./pages/RecordsList.vue";
// import Tasks from "./pages/Tasks.vue";
import Boards from "./pages/Boards.vue";
// import Users from "./pages/Users.vue";
// import Settings from "./pages/Settings.vue";
import SignUp from "./pages/SignUp.vue";
import SignIn from "./pages/SignIn.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Boards, meta: { requiresAuth: true } },
    // { path: "/users", component: Users, meta: { requiresAuth: true } },
    // { path: "/tasks", component: Boards, meta: { requiresAuth: true } },
    // { path: "/records", component: Records, meta: { requiresAuth: true } },
    // { path: "/list", component: RecordsList, meta: { requiresAuth: true } },
    // { path: "/settings", component: Settings, meta: { requiresAuth: true } },
    { path: "/SignUp", component: SignUp },
    { path: "/SignIn", component: SignIn, meta: { requiresUnauth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !localStorage.getItem("loginUser")) {
    next("/SignIn");
  } else if (to.meta.requiresUnauth && localStorage.getItem("loginUser")) {
    next("/");
  } else {
    next();
  }
});

export default router;
