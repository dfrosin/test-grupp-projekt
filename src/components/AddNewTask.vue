<script>
  import { v4 as uuidv4 } from 'uuid'

  export default {
    emits: ['send-task', 'this.tasks'],
    props: {
      firstStatus: {
        type: String,
        default: ''
      }
    },
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
        this.dataValue.status = this.firstStatus
        this.dataValue.tasks = 'tasks'
        this.dataValue.uuid = uuidv4()
        this.dataValue.color = 'rgb(0, 0, 0)'
        let copiedObject = JSON.parse(JSON.stringify(this.dataValue))
        this.tasks.push(copiedObject)
        console.log(this.tasks)
      },
      addNewTask() {
        this.$emit('send-task', this.dataValue)
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
