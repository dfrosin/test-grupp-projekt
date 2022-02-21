<script>
  import { firestore } from '../firebase'
  import { setDoc, doc } from 'firebase/firestore'

  export default {
    data() {
      return {
        newTask: '',
        tasks: [],
        array: [],
        dataValue: {},
        getColor: '',
        editing: null,
        editTaskName: '',
        taskName: ''
      }
    },

    methods: {
      // addTask() {
      // this.$store.commit('setColor', this.getColor)
      // this.tasks.push({
      //   heading: this.newTask
      // })
      //   console.log(this.tasks)
      //   this.createList()
      //   this.newTask = ''
      // },
      removeTask(task) {
        const taskIndex = this.tasks.indexOf(task)
        this.tasks.splice(taskIndex, 1)
        console.log('efter du tagit bort:' + this.tasks)
      },
      editTask() {
        this.editing = true
      },
      saveTask() {
        this.editing = false
        this.editTaskName = ''
      },

      createList() {
        // Skapar JSON-objekt och pushar in det i en Array varje gång man trycker på "add task"
        // enter i inputfältet
        this.dataValue.color = this.getColor
        this.dataValue.name = this.newTask
        this.dataValue.status = 'todo'
        let copiedObject = JSON.parse(JSON.stringify(this.dataValue))
        this.tasks.push(copiedObject)
        this.newTask = ''
      },
      createAccount() {
        this.$store.commit('setNumberOfTasks', this.array)
        this.array.forEach((allDocs) => {
          setTimeout(() => {
            const whereToAddData = doc(
              firestore,
              `${this.$store.state.projectName}/${this.dataValue.name}`
            )
            setDoc(whereToAddData, allDocs)
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
    <form @submit.prevent="createList">
      <input
        v-model="newTask"
        type="text"
        name="newTask"
        id="newTask"
        placeholder="Add Task"
      />
      <button v-if="newTask" type="submit" class="btn btn-success mt-3">
        Add task
      </button>
    </form>

    <div class="remove-div">
      <!-- <h2 class="h2-added">Added Tasks</h2> -->
      <ul>
        <li
          v-for="task in tasks"
          :key="task"
          :style="{ borderColor: task.color }"
        >
          <p class="task-name" v-if="!editing">
            {{ task.name }}
          </p>
          <input
            :id="task.name"
            v-if="editing"
            type="text"
            v-model="task.name"
          />
          <div class="list-object">
            <img
              :id="task.name"
              :edit="editing"
              v-if="!editing"
              src="/assets/edit.png"
              alt="edit"
              @click="editTask"
            />
            <img
              v-if="editing"
              src="/assets/save.png"
              alt="save"
              @click="saveTask"
            />
            <img
              src="/assets/trash-can.png"
              alt="delete"
              @click="removeTask(task)"
            />
          </div>
        </li>
      </ul>
    </div>
    <button
      v-if="tasks != 0"
      @click="createAccount"
      class="btn btn-success mt-3"
    >
      Create Task
    </button>
  </section>
</template>

<style lang="scss" scoped>
  #color {
    margin: 3rem;
    width: 40rem;
    position: absolute;
    top: 11.5rem;
    right: 10rem;
    input {
      align-self: flex-start;
      width: 4rem;
      height: 3rem;
    }
    label {
      font-size: 2.8rem;
      font-weight: 500;
    }
  }
  .main-section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(8, 1fr);
    background-color: rgba(248, 246, 243, 0.39);
    width: 85%;
    margin: auto;
    margin-top: auto;
    margin-top: 10rem;
    margin-bottom: 3rem;
  }
  .task-name {
    width: 80%;
    margin: 0;
    height: fit-content;
  }

  .h2-add {
    margin-left: 2rem;
    grid-row: 1;
    grid-column: 1;
  }
  s .h2-added {
    grid-row: 1;
    grid-column: 2;
    align-self: center;
    justify-self: center;
  }

  .remove-div {
    display: flex;
    // display: grid;
    // grid-template-columns: 1fr, 1fr;
    grid-column: 2/5;
    grid-row: 2/10;
    // max-height: 22rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    // display: grid;
    // grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  li {
    display: flex;
    // justify-content: space-between;
    // margin: auto;
    list-style: none;
    border: 3px solid white;
    background-color: rgba(188, 130, 235, 0.315);
    color: white;
    // padding: 10px;
    margin-top: 10px;
    width: 30rem;
    // min-height: 3rem;
    border-radius: 10px;
    font-size: 1.3rem;
    height: fit-content;
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
    width: 20rem;
    margin-left: 2rem;
  }

  .btn {
    margin: 2rem;
    grid-row: 10;
    grid-column: 2;
    justify-self: center;
    align-self: center;
  }
  form {
    display: flex;
    flex-direction: column;
    grid-column: 1;
    grid-row: 2/7;
  }
</style>
