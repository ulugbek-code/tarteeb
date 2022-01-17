export default {
  isNavOpened(state) {
    return state.isNavOpened;
  },
  getMaxOrder(state) {
    const maxN = state.lists.map((list) => list.order);
    state.lastListId = Math.max(...maxN) + 1;
    return state.lastListId;
  },
  users(state) {
    return state.users;
  },
  loginUser(state) {
    return state.loginUser;
  },
  lastListId(state) {
    return state.lastListId;
  },
  lastCardId(state) {
    return state.lastCardId;
  },
  lists(state) {
    return state.lists;
  },
  cardss(state) {
    return state.cardss;
  },
};
