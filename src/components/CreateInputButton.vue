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
          heading: this.newTask,
          done: false
        })
        this.newTask = ''
      },
      removeTask(task) {
        const taskIndex = this.tasks.indexOf(task)
        this.tasks.splice(taskIndex, 1)
      },
      allDone() {
        this.tasks.forEach((task) => {
          task.done = true
        })
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
  <button @click="allDone" type="button" class="btn btn-success mt-3">
    All done
  </button>
  <ul>
    <li v-for="task in tasks" :key="task">
      <input type="checkbox" v-model="task.done" />
      <span :class="{ done: task.done }">
        {{ task.heading }}
      </span>
      <button
        @click="removeTask(task)"
        type="button"
        class="btn btn-success mt-3"
      >
        Remove task
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .done {
    text-decoration: line-through;
  }
</style>
