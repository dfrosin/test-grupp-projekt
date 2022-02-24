<script>
  import { v4 as uuidv4 } from 'uuid'

  export default {
    emits: ['sendTask', 'this.tasks'],
    data() {
      return {
        newTask: '',
        tasks: [],
        dataValue: {},
        taskName: ''
      }
    },
    methods: {
      createTask() {
        this.dataValue.name = this.newTask
        this.dataValue.status = 'TODO'
        this.dataValue.tasks = 'tasks'
        this.dataValue.uuid = uuidv4()
        let copiedObject = JSON.parse(JSON.stringify(this.dataValue))
        this.tasks.push(copiedObject)
        console.log(this.tasks)
      },
      addNewTask() {
        this.$emit('sendTask', this.tasks)
      }
    }
  }
</script>

<template>
  <form @submit.prevent="createTask">
    <input
      class="new-task-input"
      v-model="newTask"
      type="text"
      name="newTask"
      id="newTask"
      placeholder="Add new Task"
    />

    <!-- skapa en emit-funktion som skickar informationen till sprinttestvue -->
    <button @click="addNewTask" type="submit" class="btn btn-success mt-3">
      Add new task
    </button>
  </form>
</template>
