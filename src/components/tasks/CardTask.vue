<template>
  <input
    class="input-card"
    type="text"
    placeholder="Create a Card"
    v-model.trim="cardName"
    @keyup.enter="createCard"
  />
</template>

<script>
import axios from "axios";
export default {
  props: ["listId"],
  data() {
    return {
      cardName: "",
    };
  },
  methods: {
    async createCard() {
      if (this.cardName !== "") {
        let tomorrow = new Date(
          new Date().setDate(new Date().getDate() + 2)
        ).toISOString();

        const res = {
          description: this.cardName,
          priority: 1,
          deadline: tomorrow,
          createdBy: 4,
          statusId: this.listId,
          userId: 4,
          reporterId: 4,
        };
        // console.log(res);
        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };
        this.$Progress.start();
        await axios.post(
          "https://time-tracker.azurewebsites.net/api/Tasks",
          res,
          { headers }
        );
        // const card = {
        //   listId: this.listId,
        //   name: this.cardName,
        // };
        // this.$store.dispatch("createCard", card);
        this.cardName = "";
        this.$store.dispatch("getCards");
        this.$Progress.finish();
      }
    },
  },
};
</script>

<style scoped>
.input-card {
  position: relative;
  background-color: white;
  min-height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  word-break: break-all;
  font-size: 16px;
}
</style>
