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
  getDays(context) {
    let curr = new Date();
    let week = [];
    let weekOrg = [];
    let fullArray = [];

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toDateString(); //.slice(0, 10)
      day =
        day.substring(8, 10) +
        "−" +
        day.substring(4, 7) +
        ", " +
        day.substring(0, 3);
      let dayOrg =
        new Date(curr.setDate(first)).toISOString().slice(0, 8) +
        day.slice(0, 2) +
        "T00:00:00";
      let obj = {};

      obj.date = day;
      obj.dateOrg = dayOrg;
      week.push(day);
      weekOrg.push(dayOrg);
      fullArray.push(obj);
    }
    context.commit("getAllDays", fullArray);
    context.commit("getDays", week);
    context.commit("getOrgDays", weekOrg);
  },
  async getTimes(context) {
    try {
      const res = await axios.get(
        `https://time-tracker.azurewebsites.net/api/Times/${
          context.state.loginUser.id
        }/${context.state.orgDays[0]}/${
          context.state.orgDays[context.state.orgDays.length - 1]
        }`
      );
      context.commit("getTimes", res.data);
    } catch (e) {
      console.log(e);
    }
  },
};
