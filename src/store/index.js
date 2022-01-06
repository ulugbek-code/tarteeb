import { createStore } from "vuex";

import rootMutations from "./mutations.js";
import rootActions from "./actions.js";
import rootGetters from "./getters.js";

const store = createStore({
  state() {
    return {
      isNavOpened: true,
      overlay: false,
      lastListId: 3,
      lastCardId: 5,
      currentData: null,
      lists: [
        {
          id: 1,
          name: "list #1",
        },
        {
          id: 2,
          name: "list #2",
        },
        {
          id: 3,
          name: "list #3",
        },
      ],
      cards: [
        {
          listId: 1,
          id: 1,
          name: "card 1",
        },
        {
          listId: 2,
          id: 2,
          name: "card 2",
        },
        {
          listId: 3,
          id: 3,
          name: "card 3",
        },
      ],
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});

export default store;
