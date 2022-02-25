<script>
  import { firestore } from '../firebase.js'
  // import { collection, getDocs } from 'firebase/firestore'
  import {
    where,
    limit,
    collection,
    query,
    getDocs,
    doc,
    updateDoc
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
        inProgress: [],
        review: [],
        done: [],
        dragging: false,
        todo: [],
        arrayOfTasks: [],
        tasks: [],
        targetObject: null,
        projectName: '',
        arrayOfProjectNames: null,
        newTask: '',
        select: false,
        date: '',
        taskId: null
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
          let tasks = []
          snapshot.docs.forEach((doc) => {
            tasks.push({ ...doc.data(), id: doc.id })
          })
          this.arrayOfTasks = tasks

          this.todo = this.arrayOfTasks.filter((el) => {
            return el.status === 'TODO'
          })
          this.inProgress = this.arrayOfTasks.filter((el) => {
            return el.status === 'IN_PROGRESS'
          })
          this.review = this.arrayOfTasks.filter((el) => {
            return el.status === 'REVIEW'
          })
          this.done = this.arrayOfTasks.filter((el) => {
            return el.status === 'DONE'
          })
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
        //hämtar namnet på columnen via CSS klassnamn
        let status = evt.to.parentNode.className
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
      selectProjectName(evt) {
        this.projectName = evt.target.value
        this.select = true
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
    <sprint-list class="column" title="todo">
      <section class="TODO">
        <draggable
          :list="todo"
          :move="(event) => detectMove(event, 123)"
          group="walla"
          ghost-class="on-drag"
          class="drop-zone-height"
        >
          <sprint-card
            v-for="card in todo"
            :key="card.id"
            :item="card"
            :name="card.name"
            :date="date"
            :board="projectName"
            class="drag-element"
          />
        </draggable>
      </section>
    </sprint-list>

    <sprint-list class="column" title="In Progress">
      <section class="IN_PROGRESS">
        <draggable
          :list="inProgress"
          :move="(event) => detectMove(event, 123)"
          group="walla"
          ghost-class="on-drag"
          class="drop-zone-height"
        >
          <sprint-card
            v-for="card in inProgress"
            :key="card.id"
            :item="card"
            :name="card.name"
            :date="date"
            :board="projectName"
            class="drag-element"
          />
        </draggable>
      </section>
    </sprint-list>

    <sprint-list class="column" title="Review">
      <section class="REVIEW">
        <draggable
          :list="review"
          :move="(event) => detectMove(event, 123)"
          group="walla"
          ghost-class="on-drag"
          class="drop-zone-height"
        >
          <sprint-card
            v-for="card in review"
            :key="card.id"
            :item="card"
            :name="card.name"
            :date="date"
            :board="projectName"
            class="drag-element"
          />
        </draggable>
      </section>
    </sprint-list>

    <sprint-list class="column" title="Done">
      <section class="DONE">
        <draggable
          :list="done"
          :move="(event) => detectMove(event, 123)"
          group="walla"
          ghost-class="on-drag"
          class="drop-zone-height"
        >
          <sprint-card
            v-for="card in done"
            :key="card.id"
            :item="card"
            :name="card.name"
            :date="date"
            :board="projectName"
            class="drag-element"
          />
        </draggable>
      </section>
    </sprint-list>
  </article>
</template>

<style lang="scss" scoped>
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
  }
  .column {
    min-width: 200px;
    width: 20%;
    max-width: 300px;
  }
  .DONE,
  .TODO,
  .REVIEW,
  .IN_PROGRESS {
    background-color: rgba(249, 249, 249, 0.564);
    border-radius: 10px;
    flex-wrap: wrap;
    margin-bottom: 5rem;
    padding: 6px;
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
  }
</style>
<!-- Todo:
1. Skapa en vit jävla bakgrund med opacity så den är genomskinlig.
2. skapa en section som innehåller allt.
3. skapa divar.
4. divarna ska ingå i flex-grid. (Space between? Kanske får se.)
 -->
