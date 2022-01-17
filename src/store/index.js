import { createStore } from "vuex";

import rootMutations from "./mutations.js";
import rootActions from "./actions.js";
import rootGetters from "./getters.js";

const store = createStore({
  state() {
    return {
      isNavOpened: true, //for hamburger menu
      lastListId: null, //for creating new board
      lists: [],
      cardss: [],
      users: [],
      loginUser: JSON.parse(localStorage.getItem("loginUser")) || null, //Object.keys(obj).length === 0;
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});

export default store;
