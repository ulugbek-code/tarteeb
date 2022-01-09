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
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0IiwiZ2l2ZW5fbmFtZSI6IkVsYmVrIiwidW5pcXVlX25hbWUiOiJOb3JtdXJvZG92Iiwicm9sZSI6Ik1hbmFnZXIiLCJuYmYiOjE2NDE3MDc5NTcsImV4cCI6MTY0MTg4MDc1NywiaWF0IjoxNjQxNzA3OTU3fQ.x6Wp5QxCu3-kIiw6yxAWCwpUzJk1HJ_iUs40gn234wk",
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
