<script>
  import { firestore } from '../firebase.js'
  // import { collection, getDocs } from 'firebase/firestore'
  import {
    where,
    limit,
    collection,
    query,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    setDoc
  } from 'firebase/firestore'
  import SprintList from '../components/SprintList.vue'
  import SprintCard from '../components/SprintCard.vue'
  import { VueDraggableNext } from 'vue-draggable-next'
  import AddNewTask from '../components/AddNewTask.vue'

  export default {
    components: {
      SprintList,
      SprintCard,
      draggable: VueDraggableNext,
      AddNewTask
    },
    data() {
      return {
        enabled: true,
        dragging: false,
        arrayOfTasks: [],
        tasks: [],
        targetObject: null,
        projectName: null,
        arrayOfProjectNames: null,
        newTask: '',
        select: false,
        date: '',
        taskId: null,
        objectOfTasks: {},
        anotherArray: [],
        projectInfo: null,
        statusInput: '',
        editStatus: false,
        addHover: false
      }
    },

    mounted() {
      this.getAllProjectNames()
    },
    methods: {
      getDatabase() {
        const customerOrdersQuery = query(
          collection(firestore, `${this.projectName}`),
          where('tasks', '==', 'tasks'),
          limit(50)
        )

        getDocs(customerOrdersQuery).then((snapshot) => {
          this.anotherArray = []
          let tasks = []
          snapshot.docs.forEach((doc) => {
            tasks.push({ ...doc.data(), id: doc.id })
          })
          this.arrayOfTasks = tasks

          for (let n = 0; n < this.projectInfo.status.length; n++) {
            // statusnamn utifrån array
            let statusTitle = this.projectInfo.status[n]
            let tasks = this.arrayOfTasks.filter((el) => {
              return el.status === statusTitle
            })
            let dynamicObject = {
              title: statusTitle,
              cards: tasks
            }
            this.anotherArray.push(dynamicObject)
          }
        })
      },
      getAllProjectNames() {
        const allProjectNames = query(
          collection(firestore, 'projects'),
          where('project', '==', 'project'),
          limit(50)
        )
        getDocs(allProjectNames).then((snapshot) => {
          let projectNames = []
          snapshot.docs.forEach((doc) => {
            projectNames.push({ ...doc.data(), id: doc.id })
          })
          this.arrayOfProjectNames = projectNames
        })
      },

      detectMove(evt) {
        this.printTimestamp()
        //hämtar namnet på columnen via CSS id
        let status = evt.to.parentNode.id
        //hämtar uuid:t på tasken
        this.taskId = evt.dragged.id
        //filtrerar ut och hittar det specifika elementet
        let find = this.arrayOfTasks.filter((el) => {
          return el.uuid === this.taskId
        })
        this.targetObject = find
        //uppdaterar status nyckeln till den specifika columnens namn
        this.targetObject[0].status = status
        this.targetObject[0].time = this.date

        this.updateStatus()
      },
      async selectProjectName(evt) {
        this.projectName = evt.target.value
        this.$store.commit('setProjectName', this.projectName)
        this.select = true
        const projectDoc = doc(firestore, `projects/${this.projectName}`)
        const projectSnapshot = await getDoc(projectDoc)
        this.projectInfo = projectSnapshot.data()

        this.getDatabase()
      },
      updateStatus() {
        //skickas varje gång man flyttar ett kort, skickar med objektet som
        //ligger i detectMove
        const whereToAddData = doc(
          firestore,
          `${this.projectName}/${this.targetObject[0].name}`
        )

        const updateData = this.targetObject[0]

        updateDoc(whereToAddData, updateData)
      },
      printTimestamp() {
        this.date = new Date().toLocaleString('en-GB', {
          day: 'numeric', // numeric, 2-digit
          month: 'short', // numeric, 2-digit, long, short, narrow
          hour: 'numeric', // numeric, 2-digit
          minute: 'numeric' // numeric, 2-digit
        })
      },
      getTask(tasks) {
        this.newTask = tasks
        console.log('blabla', this.newTask)
      },
      editColumn(e) {
        this.editStatus = !this.editStatus
        this.statusInput = e.target.id
      },
      saveColumn(e) {
        const status = e.target.id
        let index = this.projectInfo.status.indexOf(status)
        this.projectInfo.status.splice(index, 1)
        this.projectInfo.status.splice(index, 0, this.statusInput)
        const whereToAddData = doc(firestore, `projects/${this.projectName}`)
        setDoc(whereToAddData, this.projectInfo)
        this.editStatus = !this.editStatus
        this.getDatabase()
      },
      deleteColumn(e) {
        const status = e.target.id
        let index = this.projectInfo.status.indexOf(status)
        this.projectInfo.status.splice(index, 1)
        const whereToAddData = doc(firestore, `projects/${this.projectName}`)
        setDoc(whereToAddData, this.projectInfo)
        this.editStatus = !this.editStatus
        this.getDatabase()
      },
      addColumn() {
        this.projectInfo.status.push('New Column')
        const whereToAddData = doc(firestore, `projects/${this.projectName}`)
        setDoc(whereToAddData, this.projectInfo)
        this.getDatabase()
      }
    }
  }
</script>

<template>
  <AddNewTask @send-task="getTask" />
  <div v-if="this.arrayOfProjectNames !== null">
    <select @change="selectProjectName">
      <option>Select a project</option>
      <option v-for="projects in this.arrayOfProjectNames" :key="projects.id">
        {{ projects.id }}
      </option>
    </select>
    <h2 v-if="select">Project: {{ this.projectName }}</h2>
  </div>

  <article class="flex-container">
    <p
      class="add-column"
      @click="addColumn"
      @mouseover="addHover = true"
      @mouseleave="addHover = false"
    >
      +
    </p>
    <p v-if="addHover" class="tool-tip">Add a new column</p>
    <sprint-list
      class="column"
      v-for="object in anotherArray"
      :key="object.cards"
      :title="object.title"
    >
      <p
        v-if="object.cards.length < 1 && !editStatus"
        @click="editColumn"
        class="edit-column"
        :id="object.title"
      >
        edit
      </p>
      <p
        v-if="object.cards.length < 1 && editStatus"
        @click="saveColumn"
        class="save-column"
        :id="object.title"
      >
        save
      </p>
      <p
        v-if="object.cards.length < 1 && editStatus"
        @click="deleteColumn"
        class="delete-column"
        :id="object.title"
      >
        delete
      </p>
      <input
        v-if="object.cards.length < 1 && editStatus"
        v-model="statusInput"
        type="text"
        class="status-input"
      />
      <section :id="object.title" class="sections">
        <draggable
          :list="object.cards"
          :move="(event) => detectMove(event, 123)"
          group="walla"
          ghost-class="on-drag"
          class="drop-zone-height"
        >
          <sprint-card
            v-for="card in object.cards"
            :key="card.id"
            :item="card"
            class="drag-element"
          />
        </draggable>
      </section>
    </sprint-list>
  </article>
</template>

<style lang="scss" scoped>
  select {
    font-size: 1.2rem;
    padding: 1rem;
    border-radius: 10px;
    margin-left: 4rem;
  }
  h2 {
    margin-left: 4rem;
    color: white;
  }
  h3 {
    color: white;
    margin: 3rem 0 1rem 0;
  }
  .flex-container {
    background-color: rgba(235, 235, 235, 0.3);
    margin: 30px auto;
    max-width: 80%;
    padding-top: 20px;
    display: flex;
    grid-template-columns: auto;
    justify-content: space-evenly;
    text-align: center;
    border-radius: 10px;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    position: relative;
    .add-column {
      color: white;
      font-size: 2rem;
      position: absolute;
      top: 2px;
      right: 10px;
      cursor: pointer;
    }
    .tool-tip {
      position: absolute;
      width: 50px;
      background-color: rgba(235, 235, 235, 0.3);
      color: white;
      padding: 5px;
      border-radius: 10px;
      top: -60px;
      right: 0;
    }
    .add-column:hover {
      color: aqua;
    }
    .edit-column {
      cursor: pointer;
      position: absolute;
      color: white;
      text-transform: uppercase;
      top: 4px;
      right: 0px;
    }
    .save-column {
      cursor: pointer;
      position: absolute;
      color: white;
      text-transform: uppercase;
      top: -2px;
      right: -2px;
    }
    .delete-column {
      cursor: pointer;
      position: absolute;
      color: white;
      text-transform: uppercase;
      top: 12px;
      right: -2px;
    }
    .status-input {
      position: absolute;
      font-size: 1.5rem;
      top: 0px;
      left: 20%;
      width: 60%;
      text-align: center;
    }
    .edit-column:hover,
    .save-column:hover,
    .delete-column:hover {
      color: aqua;
      text-decoration: underline;
    }
  }
  .column {
    min-width: 200px;
    width: 20%;
    max-width: 300px;
    position: relative;
    margin: 0 1%;
  }
  .sections {
    background-color: rgba(249, 249, 249, 0.564);
    border-radius: 10px;
    flex-wrap: wrap;
    margin-bottom: 5rem;
    padding: 6px;
    position: relative;
  }

  .drag-element {
    font-size: 1.5rem;
    text-align: center;
    color: black;
    width: 90%;
    background-color: white;
    border-radius: 10px;
    border: 3px solid;
    min-height: 10px;
    cursor: grab;
    position: relative;
    margin: 5% 5%;
  }
  .drag-element:hover {
    box-shadow: 0 0 5px;
  }
  .on-drag {
    background-color: rgb(81, 89, 194);
    color: #fff;
    z-index: 10;
  }
  .drop-zone-height {
    height: 60vh;
    padding-bottom: 10%;
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .drop-zone-height::-webkit-scrollbar {
    display: none;
  }
</style>
