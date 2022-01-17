<template>
  <p>{{ task.task }}</p>
  <p>{{ task.hour }} h</p>
  <p>
    {{ task.desc }}
    <span @click="edit" class="task-btn-wrapper">
      <img src="../../assets/more.svg" alt="" />
    </span>
    <span :class="{ trash: isEdit }" id="edit">
      <small>Edit</small>
      <small>Delete</small>
    </span>
  </p>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    edit() {
      this.isEdit = !this.isEdit;
    },
  },
};
</script>

<style scoped>
p:first-child {
  width: 35%;
}
p:nth-child(2) {
  justify-content: center;
  text-align: center;
  width: 10%;
}
p:last-child {
  width: 55%;
  padding-left: 16px;
}
.task-btn-wrapper {
  display: none;
  padding: 2px;
  position: absolute;
  top: 26%;
  right: 1%;
  cursor: pointer;
}
.tasks:hover .task-btn-wrapper {
  display: initial;
}
#edit {
  opacity: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  width: 100px;
  padding: 4px;
  font-size: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 4px;
  position: absolute;
  top: 40%;
  right: 2%;
  background: #fff;
  cursor: pointer;
  z-index: 10;
}
#edit.trash {
  opacity: 1;
  pointer-events: initial;
}
#edit small:hover {
  background: rgb(199, 204, 206);
}
</style>
