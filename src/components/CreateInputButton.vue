<script>
  export default {
    data() {
      return {
        title: 'Add task',
        newTask: '',
        tasks: []
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
    <button type="submit" class="btn btn-success mt-3">Add task</button>
  </form>

  <ul>
    <li v-for="task in tasks" :key="task">
      <span :class="{ done: task.done }"> {{ task.heading }} </span>
      <img src="/assets/trash-can.png" alt="" @click="removeTask(task)" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  li {
    list-style-type: none;
  }
</style>
