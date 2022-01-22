import axios from "axios";
// import moment from "moment";

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
    try {
      const res = await axios.get(
        "https://time-tracker.azurewebsites.net/api/Tasks"
      );
      context.commit("getCards", res);
    } catch (e) {
      console.log(e.message); //Network error
    }
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
      console.log(e.response);
    }
  },
  getDays(context) {
    let curr = null;
    curr = new Date();
    let week = [];
    let weekOrg = [];
    let fullArray = [];
    // const l = moment().day();
    // console.log(l);

    // if (payload === "next") {
    //   curr = new Date(new Date().getTime() + 604800000 * context.state.next);
    //   context.commit("plusNext");
    // } else if (payload === "prev") {
    //   curr = new Date(new Date().getTime() - 604800000 * context.state.prev);
    //   console.log(curr);
    //   context.commit("plusPrev");
    // }
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      // console.log(first); // to find first day of the week
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
    //

    // if (payload === "prev") {
    //   curr = new Date(
    //     new Date(weekOrg[0]).getTime() - 604800000 * context.state.prev
    //   );
    //   context.commit("plusPrev");
    //   console.log(curr);
    // } else if (payload === "next") {
    //   curr = new Date(
    //     new Date(weekOrg[0]).getTime() + 604800000 * context.state.next
    //   );
    //   context.commit("plusNext");
    //   console.log(curr);
    // }
    context.commit("getAllDays", fullArray); //clean the code!!!
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
      console.log(e.message); //Network error
    }
  },
};
