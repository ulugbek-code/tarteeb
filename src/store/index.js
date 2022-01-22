import { createStore } from "vuex";

import rootMutations from "./mutations.js";
import rootActions from "./actions.js";
import rootGetters from "./getters.js";

const store = createStore({
  state() {
    return {
      isNavOpened: true, //for hamburger menu
      lastListId: null, //for creating new board
      first: null, //first day of the week
      last: null, //last day of the week
      firstDay: null, //first day and week name
      lastDay: null, //last day and week
      prev: 1,
      next: 1,
      curr: null,
      lists: [],
      cardss: [],
      users: [],
      allDays: [],
      days: [], //week days
      orgDays: [], //'2022-01-02T04:29:05.845Z'
      times: [],
      loginUser: JSON.parse(localStorage.getItem("loginUser")) || null, //Object.keys(obj).length === 0;
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});

export default store;
