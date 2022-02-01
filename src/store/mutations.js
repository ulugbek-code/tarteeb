export default {
  toggleNavbar(state) {
    state.isNavOpened = !state.isNavOpened;
  },
  getLists(state, payload) {
    state.lists = payload.data;
  },
  getCards(state, payload) {
    state.cardss = payload.data;
  },
  getUsers(state, payload) {
    state.users = payload.data;
  },
  getAllDays(state, payload) {
    state.allDays = payload;
  },
  getDays(state, payload) {
    state.days = payload;
  },
  getOrgDays(state, payload) {
    state.orgDays = payload;
  },
  getTimes(state, payload) {
    state.times = payload;
  },
  plusPrev(state) {
    state.offset = state.offset - 1;
  },
  plusNext(state) {
    state.offset = state.offset + 1;
  },
  clearState(state) {
    state.loginUser = null;
    state.decodedUser = null;
    state.isAuth = false;
  },
  changeAuth(state) {
    state.isAuth = true;
    // this.$forceUpdate();
    state.loginUser = JSON.parse(localStorage.getItem("loginUser"));
    state.decodedUser = JSON.parse(localStorage.getItem("decodedToken"));
  },
};
