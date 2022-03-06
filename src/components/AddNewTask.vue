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
        this.dataValue.status = 'Todo'
        this.dataValue.PBI = 'Not assigned'
        let copiedObject = JSON.parse(JSON.stringify(this.dataValue))
        this.tasks.push(copiedObject)
      },
      addNewTask() {
        this.$emit('send-task', this.dataValue)
        setTimeout(() => {
          this.newTask = ''
        }, 500)
      }
    }
  }
</script>

<template>
  <form class="add-new-task" @submit.prevent="createTask">
    <input
      class="new-task-input"
      v-model="newTask"
      type="text"
      name="newTask"
      id="newTask"
      placeholder="Add new Task"
    />

    <!-- skapa en emit-funktion som skickar informationen till sprinttestvue -->
    <button @click="addNewTask" type="submit" class="btn btn-secondary mt-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-plus-circle"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
        />
        <path
          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
        />
      </svg>
    </button>
  </form>
</template>

<style lang="scss" scoped>
  // .add-new-task {
  //   position: absolute;
  //   right: 10%;
  // }

  input {
    background-color: transparent;
    border-bottom: 2px solid rgba(204, 201, 226, 0.616);
    color: #fff;
    font-size: 2rem;
    width: 20rem;
    margin-left: 2rem;
  }
</style>
