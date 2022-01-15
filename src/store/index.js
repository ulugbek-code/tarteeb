import { createStore } from "vuex";

import rootMutations from "./mutations.js";
import rootActions from "./actions.js";
import rootGetters from "./getters.js";

const store = createStore({
  state() {
    return {
      isNavOpened: true, //for hamburger menu
      lastListId: null, //for creating new board
      // currentData: null,
      lists: [],
      // cards: [
      //   {
      //     listId: 1,
      //     id: 1,
      //     name: "card 1",
      //   },
      //   {
      //     listId: 2,
      //     id: 2,
      //     name: "card 2",
      //   },
      //   {
      //     listId: 3,
      //     id: 3,
      //     name: "card 3",
      //   },
      // ],
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
