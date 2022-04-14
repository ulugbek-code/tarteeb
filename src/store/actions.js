import axios from "axios";

export default {
  toggleNavbar(context) {
    context.commit("toggleNavbar");
  },
  async getLists(context) {
    const res = await axios.get("https://tarteeb.azurewebsites.net/api/Boards");
    context.commit("getLists", res);
  },
  async getCards(context) {
    try {
      const res = await axios.get(
        "https://tarteeb.azurewebsites.net/api/Tasks"
      );
      context.commit("getCards", res);
    } catch (e) {
      console.log(e.message); //Network error
    }
  },
  async getUsers(context) {
    try {
      const res = await axios.get(
        "https://tarteeb.azurewebsites.net/api/user/getUsersByManagerId",
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
        context.commit("clearState");
      }
      console.log(e.message);
    }
  },
  getDays(context, payload) {
    let curr, first, day;
    curr = new Date();
    let dayOfWeekOffset = curr.getDay();
    let week = [];
    let weekOrg = [];
    let fullArray = [];

    if (payload === "next") {
      context.commit("plusNext");
    } else if (payload === "prev") {
      context.commit("plusPrev");
    }
    for (let i = 1; i <= 7; i++) {
      first = new Date();
      first.setDate(
        first.getDate() - dayOfWeekOffset + context.state.offset * 7 + i
      );
      day = new Date(first).toDateString(); //.slice(0, 10)
      day =
        day.substring(8, 10) +
        "−" +
        day.substring(4, 7) +
        ", " +
        day.substring(0, 3);
      let dayOrg =
        new Date(first).toISOString().slice(0, 8) +
        day.slice(0, 2) +
        "T00:00:00";
      let obj = {};

      obj.date = day;
      obj.dateOrg = dayOrg;
      week.push(day);
      weekOrg.push(dayOrg);
      fullArray.push(obj);
    }

    context.commit("getAllDays", fullArray); //clean the code!!!
    context.commit("getDays", week);
    context.commit("getOrgDays", weekOrg);
  },
  async getTimes(context) {
    // console.log(context.state.loginUser.id);
    try {
      const res = await axios.get(
        `https://tarteeb.azurewebsites.net/api/Times/${
          context.state.loginUser.id
        }/${context.state.orgDays[0]}/${
          context.state.orgDays[context.state.orgDays.length - 1]
        }`
      );
      context.commit("getTimes", res.data);
    } catch (e) {
      console.log(e.message); //Network error
    }
  },
  changeAuth(context) {
    context.commit("changeAuth");
  },
};
