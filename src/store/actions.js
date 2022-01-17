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
    try {
      const res = await axios.get(
        "https://time-tracker.azurewebsites.net/api/user/getUsersByManagerId",
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginUser")).token
            }`,
          },
        }
      );
      context.commit("getUsers", res);
    } catch (e) {
      if (e.response.status == 401) {
        localStorage.clear();
        this.$router.replace("/signIn");
      }
    }
  },
};
