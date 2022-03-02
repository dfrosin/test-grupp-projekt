<script>
  import { firestore } from '../firebase'
  import { setDoc, doc } from 'firebase/firestore'
  import { v4 as uuidv4 } from 'uuid'

  export default {
    data() {
      return {
        newTask: '',
        tasks: [],
        dataValue: {},
        getColor: '',
        editing: null,
        editTaskName: '',
        taskName: '',
        selectedColor: '',
        nameOnPbi: ''
      }
    },
    methods: {
      selectedPbi(e) {
        this.selectedColor = e.target.value
      },
      removeTask(task) {
        const taskIndex = this.tasks.indexOf(task)
        this.tasks.splice(taskIndex, 1)
        console.log('efter du tagit bort:' + this.tasks)
      },
      editTask(taskId) {
        this.editing = taskId
      },
      saveTask() {
        this.editing = false
        this.editTaskName = ''
      },

      createList() {
        // Skapar JSON-objekt och pushar in det i en Array varje gång man trycker på "add task"
        // enter i inputfältet
        this.dataValue.color = this.selectedColor
        this.dataValue.name = this.newTask
        this.dataValue.status = 'Todo'
        this.dataValue.tasks = 'tasks'
        this.dataValue.uuid = uuidv4()
        this.dataValue.PBI = this.nameOnPbi
        let copiedObject = JSON.parse(JSON.stringify(this.dataValue))
        this.tasks.push(copiedObject)
        console.log(this.tasks)
        this.newTask = ''
      },
      createAccount() {
        this.$store.commit('setArrayOfTasks', this.tasks)
        this.tasks.forEach((allDocs) => {
          setTimeout(() => {
            const whereToAddData = doc(
              firestore,
              `${this.$store.state.projectName}/${allDocs.name}`
            )
            setDoc(whereToAddData, allDocs)
          }, 2000)
        })
      },
      nameOfPBI(e) {
        this.nameOnPbi = e.target.id
        console.log(this.nameOnPbi)
      }
    }
  }
</script>

<template>
  <div
    class="select-pbi"
    v-if="this.$store.state.arrayOfObjects !== null"
    id="userstories"
  >
    <label for="PBI">Select PBI: </label>
    <select
      @change="selectedPbi"
      class="form-select form-select-lg mb-3"
      aria-label=".form-select-lg example"
    >
      <option value="Select PBI" />
      <option
        v-for="object in this.$store.state.arrayOfObjects"
        :key="object.id"
        :value="object.color"
        :id="object.id"
        @click="nameOfPBI"
      >
        {{ object.id }}
      </option>
    </select>
  </div>

  <section class="main-section">
    <h2 class="h2-add">Create Task</h2>
    <form @submit.prevent="createList">
      <input
        class="new-task-input"
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
          <p class="task-name" v-if="editing !== task.uuid">
            {{ task.name }}
          </p>
          <textarea
            :id="task.uuid"
            v-if="editing === task.uuid"
            type="textarea"
            v-model="task.name"
          />
          <div class="list-object">
            <img
              :id="task.uuid"
              :edit="editing"
              v-if="editing !== task.uuid"
              src="/assets/edit.png"
              alt="edit"
              @click="editTask(task.uuid)"
            />
            <img
              v-if="editing === task.uuid"
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
  .select-pbi {
    width: 30%;

    select {
      background-color: transparent;
      color: white;
    }
    select:hover {
      background-color: white;
      color: black;
      border-color: #0dcaf0;
      border-style: solid;
      border-width: 3px;
    }
    option {
      background-color: white;
    }
  }
  #color {
    margin: 3rem;
    width: 40rem;
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
    border: 3px;
    border-style: solid;
    border-color: white;
  }
  .task-name {
    width: 78%;
    margin: 2%;
    // margin-left: 5%;
    height: fit-content;
  }

  .h2-add {
    align-items: center;
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
    grid-row: 2/8;
    // max-height: 22rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
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
    border-radius: 30px;
    font-size: 1.3rem;
    height: fit-content;
    textarea {
      height: fit-content;
      width: 78%;
      margin: 2%;
      background-color: rgba(255, 255, 255, 0);
      border-bottom: 2px solid white;
      color: white;
    }
  }

  img {
    cursor: pointer;
    margin-top: 8px;
    margin-left: 5px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  .new-task-input {
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
