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
};
