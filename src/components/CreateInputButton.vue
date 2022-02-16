<script>
  export default {
    data() {
      return {
        title: 'Add task',
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
  <h3>{{ title }}</h3>

  <form @submit.prevent="addTask">
    <label for="newTask">New Task</label>
    <input v-model="newTask" type="text" name="newTask" id="newTask" />
    <button v-if="newTask" type="submit" class="btn btn-success mt-3">
      Add task
    </button>
  </form>

  <ul>
    <li v-for="task in tasks" :key="task">
      <span> {{ task.heading }} </span>
      <img src="/assets/trash-can.png" alt="" @click="removeTask(task)" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  li {
    margin: auto;
    list-style-type: none;
    display: inline flow-root list-item;
    border-style: double;
  }

  img {
    cursor: pointer;
    width: 3rem;
    height: auto;
    margin-top: 5px;
    margin-left: 5px;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
