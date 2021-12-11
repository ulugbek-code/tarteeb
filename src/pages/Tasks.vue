<template>
  <div id="tasks-container">
    <div class="header-wrapper">
      <div class="tasks-header">
        <h2>Tasks</h2>
      </div>
    </div>
    <div class="body-wrapper">
      <div class="tasks-body">
        <div class="child todo">
          <div class="title">
            <span class="circle c-todo">{{ tasks.length }}</span>
            <h2>Todo</h2>
            <span class="dots">&#8942;</span>
            <div class="add-task">
              <input
                @keypress.enter="addTask"
                v-model="task"
                type="text"
                placeholder="Add new task"
              />
            </div>
          </div>
          <template v-if="tasks.length">
            <div class="task" v-for="(task, i) in tasks" :key="task.id">
              <h3>Task {{ ++i }}</h3>
              <p>{{ task.description }}</p>
            </div>
          </template>
          <div v-if="isLoading">Loading...</div>
        </div>
        <div class="child progress">
          <div class="title">
            <span class="circle c-process">3</span>
            <h2>Process</h2>
            <span class="dots">&#8942;</span>
          </div>
          <div class="task">
            <h3>Task 1</h3>
            <p>hello world there</p>
          </div>
          <div class="task">
            <h3>Task 2</h3>
            <p>Any description</p>
          </div>
          <div class="task">
            <h3>Task 3</h3>
            <p>Analyzing project</p>
          </div>
        </div>
        <div class="child done">
          <div class="title">
            <span class="circle c-done">2</span>
            <h2>Done</h2>
            <span class="dots">&#8942;</span>
          </div>
          <div class="task">
            <h3>Task 1</h3>
            <p>Debugging</p>
          </div>
          <div class="task">
            <h3>Task 2</h3>
            <p>Meeting</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      task: "",
      tasks: [],
    };
  },
  methods: {
    async addTask() {
      try {
        if (this.task !== "") {
          await axios.post(
            "https://time-tracker.azurewebsites.net/api/Tickets/Add",
            {
              description: this.task,
            }
          );
        }
      } catch (e) {
        console.log(e.message);
      }
      this.getTasks();

      this.task = "";
    },
    async getTasks() {
      try {
        this.isLoading = true;
        const res = await axios.get(
          "https://time-tracker.azurewebsites.net/api/Tickets/GetAll"
        );
        this.tasks = res.data;
      } catch (e) {
        console.log(e.message);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.getTasks();
  },
};
</script>

<style scoped>
#tasks-container {
  margin-left: 270px;
}
.header-wrapper {
  height: 10vh;
  padding: 1rem 2rem;
}
.tasks-header {
  width: 90%;
  margin: 0 auto;
}
.body-wrapper {
  /* height: 100%; */
  padding: 1rem 2rem;
  background: hsla(0, 0%, 86.7%, 0.4);
  border-top: 2px solid rgba(19, 23, 40, 1);
  border-top-right-radius: 1%;
  border-top-left-radius: 1%;
}
.tasks-body {
  display: flex;
  justify-content: center;
}
.child {
  width: 33%;
}
.title {
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 10px;
}
.add-task {
  position: absolute;
  right: 8%;
}
.add-task input {
  padding: 12px;
  width: 200px;
  height: 28px;
  color: #1c1f25;
  font-size: 1rem;
  border: none;
  outline: none;
}
.add-task input::placeholder {
  color: rgba(129, 130, 135, 0.7);
}
.circle {
  color: #fff;
  padding: 0 8px;
  border-radius: 50%;
  margin: 0 8px;
}
.dots {
  font-size: 22px;
  color: #6b6f6f;
  position: absolute;
  right: 3%;
  bottom: 0;
  cursor: pointer;
}
.c-todo {
  background: #0f2c67;
}
.c-process {
  background: #f3950d;
}
.c-done {
  background: #cd1818;
}
/* .todo {
}
.progress {
}
.done {
} */
.task {
  width: 96%;
  margin: 6px auto;
  padding: 8px;
  background: #fff;
  border-radius: 4px;
}
.task p {
  font-size: 14px;
}
</style>
