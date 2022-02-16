<script>
  export default {
    data() {
      return {
        newTask: '',
        tasks: [],
        remove: 'remove'
      }
    },
    methods: {
      addTask() {
        this.tasks.push({
          heading: this.newTask
        })
        this.newTask = ''
      },
      removeTask(task) {
        const taskIndex = this.tasks.indexOf(task)
        this.tasks.splice(taskIndex, 1)
      }
    }
  }
</script>

<template>
  <div class="main-div">
    <h2 class="h2-add">Create Task</h2>
    <div class="add-div">
      <form @submit.prevent="addTask">
        <label for="newTask">New Task</label>
        <input v-model="newTask" type="text" name="newTask" id="newTask" />
        <button v-if="newTask" type="submit" class="btn btn-success mt-3">
          Add task
        </button>
      </form>
    </div>

    <h2 class="h2-added">Added Tasks</h2>
    <div class="remove-div">
      <ul>
        <li v-for="task in tasks" :key="task">
          <span> {{ task.heading }} </span>
          <img src="/assets/trash-can.png" alt="" @click="removeTask(task)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .main-div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(10, 1fr);
    // grid-template-areas: ;
    background-color: rgba(255, 235, 205, 0.39);
    width: 85%;
    height: 80vh;
    margin: auto;
    margin-top: auto;
    margin-top: 10rem;
  }

  .h2-add {
    grid-row: 1;
    grid-column: 1;
    align-self: center;
    justify-self: center;
  }
  .h2-added {
    grid-row: 1;
    grid-column: 2;
    align-self: center;
    justify-self: center;
  }

  .add-div {
    grid-row: 2;
    grid-column: 1;
    align-self: center;
    justify-self: center;
    color: rgb(255, 255, 255);
    margin-right: 10px;
  }

  .remove-div {
    grid-row: 1;
    grid-column: 2;
  }

  ul {
    grid-row: 2;
    grid-column: 2;
  }

  img {
    cursor: pointer;
    width: 3rem;
    height: auto;
    margin-top: 5px;
    margin-left: 5px;
  }
</style>
