import axios from "axios";

export default {
  toggleNavbar(context) {
    context.commit("toggleNavbar");
  },
  async getLists(context) {
    const res = await axios.get(
      "https://time-tracker.azurewebsites.net/api/Boards"
    );
    context.commit("getLists", res);
  },
  async getCards(context) {
    const res = await axios.get(
      "https://time-tracker.azurewebsites.net/api/Tasks"
    );
    context.commit("getCards", res);
  },
  async getUsers(context) {
    const res = await axios.get(
      "https://time-tracker.azurewebsites.net/api/user/getUsersByManagerId",
      {
        headers: {
          Authorization: `Bearer ${context.state.loginUser.token}`,
        },
      }
    );

    context.commit("getUsers", res);
  },
  // updateBoard(context, payload) {
  //   context.commit("changeNewBoard", payload);
  // },
  // getMove(context, payload) {
  //   context.commit("getMovedEl", payload);
  // },
  // createList(context, payload) {
  //   context.commit("createNewList", payload);
  // },
  createCard(context, payload) {
    context.commit("createNewCard", payload);
  },
  toggleOverlay(context) {
    context.commit("toggleOverlay");
  },
  openForm(context, payload) {
    context.commit("openForm", payload);
  },
  saveCard(context, payload) {
    context.commit("saveCard", payload);
  },
  deleteCard(context, payload) {
    context.commit("deleteCard", payload);
  },
};
