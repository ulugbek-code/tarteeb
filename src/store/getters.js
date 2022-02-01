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
  // isManager(state) {
  //   if (state.decodedUser.role === "Manager") {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // },
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
  days(state) {
    return state.days;
  },
  orgDays(state) {
    return state.orgDays;
  },
  allDays(state) {
    return state.allDays;
  },
  first(state) {
    return state.days[0].substr(0, 2);
  },
  last(state) {
    return state.days[state.days.length - 1].substr(0, 2);
  },
  firstDay(state, getters) {
    return getters.first + " " + state.days[0].substr(3, 3);
  },
  lastDay(state, getters) {
    return getters.last + " " + state.days[state.days.length - 1].substr(3, 3);
  },
  times(state) {
    return state.times;
  },
  months(state) {
    return state.months;
  },
  getAuth(state) {
    return state.isAuth;
  },
};
