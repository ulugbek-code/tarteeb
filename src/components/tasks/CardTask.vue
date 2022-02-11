<template>
  <!-- error modal -->
  <base-dialog :show="isError" color="#fff" width="480px" @close="closeError">
    <template #default>
      <div class="form-task">
        <h3>Oops! Something went wrong! Please, contact the developers...</h3>
      </div>
    </template>
    <template #actions>
      <div class="btn-wrapper">
        <the-button @click="closeError" class="form-btn">Close</the-button>
      </div>
    </template>
  </base-dialog>
  <input
    class="input-card"
    type="text"
    placeholder="+ Add new task..."
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
      isError: false,
    };
  },
  methods: {
    closeError() {
      this.isError = false;
    },
    async createCard() {
      if (this.cardName !== "") {
        try {
          let tomorrow = new Date(
            new Date().setDate(new Date().getDate() + 2)
          ).toISOString();

          const res = {
            description: this.cardName,
            priority: 1,
            deadline: tomorrow,
            createdBy: this.$store.getters.loginUser.id,
            statusId: this.listId,
            userId: this.$store.getters.loginUser.id, //assignee was changed
            reporterId: this.$store.getters.loginUser.id,
          };
          // console.log(res);
          const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          };
          this.$Progress.start();
          await axios.post(
            "https://api-tarteeb.azurewebsites.net/api/Tasks",
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
        } catch (e) {
          this.$Progress.fail();
          this.isError = true;
        }
      }
    },
  },
};
</script>

<style scoped>
.form-task * {
  color: #444;
}
.input-card {
  position: relative;
  color: rgb(56, 60, 84);
  background-color: rgb(199, 209, 241);
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
