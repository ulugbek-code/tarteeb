<template>
  <tr
    @click="setActive(user.id)"
    v-for="user in finalUsers"
    :key="user.id"
    :class="{ active: activeId == user.id }"
  >
    <td>{{ user.id }}</td>
    <td>{{ user.firstName }} {{ user.lastName }}</td>
    <td>{{ user.phone }}</td>
    <!-- <td width="25%">
      <base-dropdown
        :options="months"
        :default="months[monthIndex]"
        @click.stop=""
        @input="getMonth($event, user.id)"
      ></base-dropdown>
    </td> -->
    <!-- <td id="last-td"><span>trash</span><span>edit</span></td> -->
  </tr>
</template>

<script>
export default {
  props: ["users", "search"],
  emits: ["sendUser"],
  data() {
    return {
      activeId: null,
      monthIndex: null,
    };
  },
  computed: {
    finalUsers() {
      return this.users.filter(
        (user) =>
          user.firstName.toLowerCase().match(this.search.toLowerCase()) ||
          user.lastName.toLowerCase().match(this.search.toLowerCase())
      );
    },
    months() {
      return this.$store.getters.months;
    },
  },
  methods: {
    setActive(id) {
      this.activeId = id;
      this.$emit("sendUser", id, this.monthIndex);
    },
    getMonth($event, id) {
      this.monthIndex = this.months.indexOf($event);
      this.$emit("sendUser", id, this.monthIndex);
    },
  },
  created() {
    this.monthIndex = new Date().getMonth();
  },
};
</script>

<style scoped>
tr {
  border-radius: 24px;
}
td {
  text-align: center;
  padding: 12px;
  font-size: 14px;
}
td:not(:nth-child(1)) {
  cursor: pointer;
}
td {
  color: rgb(68, 68, 68);
}
button {
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  color: rgb(30, 30, 30);
}
tr:not(.active):hover {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.active {
  background: hsla(0, 0%, 86.7%, 0.4);
  border-radius: 12px;
}
</style>
