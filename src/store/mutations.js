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
  // getLoginUser(state, payload) {
  //   state.loginUser = payload;
  // },
  // changeNewBoard(state, payload) {
  //   state.lists = payload;
  // },
  // getMovedEl(state, payload) {
  //   state.id = payload.draggedContext.element.id;
  //   state.newOrder = payload.relatedContext.element.order;
  // },
  // createNewList(state, payload) {
  //   // state.lastListId++;
  //   const list = {
  //     id: state.lastListId,
  //     name: payload,
  //   };
  //   state.lists.push(list);
  // },
};
