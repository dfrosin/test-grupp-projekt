<script>
  import { firestore } from '../firebase'
  import { addDoc, doc } from 'firebase/firestore'

  export default {
    data() {
      return {
        newTask: '',
        tasks: [],
        array: [],
        dataValue: {},
        getColor: ''
      }
    },
    methods: {
      addTask() {
        this.tasks.push({
          heading: this.newTask
        })
        console.log()
        this.createList()
        this.newTask = ''
      },
      removeTask(task) {
        const taskIndex = this.tasks.indexOf(task)
        this.tasks.splice(taskIndex, 1)
      },
      createList() {
        this.dataValue.color = this.getColor
        this.dataValue.name = this.newTask
        this.dataValue.status = 'todo'
        let copiedObject = JSON.parse(JSON.stringify(this.dataValue))
        this.array.push(copiedObject)
      },
      createAccount() {
        this.array.forEach((allDocs) => {
          setTimeout(() => {
            const whereToAddData = doc(
              firestore,
              `${this.store.state.projectName}/${this.newTask}`
            )
            addDoc(whereToAddData, allDocs)
          }, 2000)
        })
      }
    }
  }
</script>

<template>
  <form id="color" @submit.prevent="addColor">
    <label for="color">Select a color:</label>
    <input v-model="getColor" type="color" name="color" />
  </form>

  <section class="main-section">
    <h2 class="h2-add">Create Task</h2>
    <div class="add-div">
      <form @submit.prevent="addTask">
        <label for="newTask" />
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
      <button
        @onclick="createAccount"
        type="submit"
        class="btn btn-success mt-3"
      >
        Create Task
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .main-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(10, 1fr);
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
    grid-column: 1;
    grid-row: 2;
    align-self: center;
    justify-self: center;
    color: rgb(255, 255, 255);
    margin-right: 10px;
  }

  .remove-div {
    grid-column: 2;
    grid-row: 2/10;
    height: 40rem;
    overflow-y: scroll;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    margin-top: auto;
    list-style: none;
    border: 1px solid white;
    background-color: rgba(188, 130, 235, 0.315);
    color: white;
    padding: 10px;
    margin-top: 10px;
    width: 80%;
    min-height: 3rem;
    border-radius: 10px;
    font-size: 1.3rem;
  }

  img {
    cursor: pointer;
    margin-top: 5px;
    margin-left: 5px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin: 2px;
  }

  input {
    grid-row: 4;
    background-color: transparent;
    border-bottom: 2px solid rgba(204, 201, 226, 0.616);
    color: #fff;
    font-size: 2rem;
    width: 30rem;
    align-self: center;
    margin-left: 2rem;
  }

  .btn {
    justify-self: center;
    align-self: center;
    margin: auto;
  }
  form {
    display: flex;
    flex-direction: column;
  }
</style>
