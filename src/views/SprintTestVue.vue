/* eslint-disable vue/v-on-event-hyphenation */
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
  import TimeStamp from '../components/TimeStamp.vue'
  import AddNewTask from '../components/AddNewTask.vue'

  export default {
    components: {
      SprintList,
      SprintCard,
      TimeStamp,
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
        projectName: null,
        arrayOfProjectNames: null,
        task: ''
      }
    },

    mounted() {
      this.getAllProjectNames()
      // if (this.$store.state.arrayOfTasks === null) {
      //   this.getDatabase()
      // } else {
      //   this.arrayOfTasks = this.$store.state.arrayOfTasks
      // }
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
      // getDatabase() {
      //   const colRef = collection(db, 'Adamstest')

      //   getDocs(colRef).then((snapshot) => {
      //     let tasks = []
      //     snapshot.docs.forEach((doc) => {
      //       tasks.push({ ...doc.data(), id: doc.id })
      //     })
      //     this.arrayOfTasks = tasks

      //     this.todo = this.arrayOfTasks.filter((el) => {
      //       return el.status === 'TODO'
      //     })
      //     this.inProgress = this.arrayOfTasks.filter((el) => {
      //       return el.status === 'IN_PROGRESS'
      //     })
      //     this.review = this.arrayOfTasks.filter((el) => {
      //       return el.status === 'REVIEW'
      //     })
      //     this.done = this.arrayOfTasks.filter((el) => {
      //       return el.status === 'DONE'
      //     })
      //   })
      // },
      // async queryForDocuments() {
      //   const customerOrdersQuery = query(
      //     collection(firestore, 'Adam'),
      //     where('customer', '==', 'Fredrik'),
      //     limit(11)
      //   )
      //   const querySnapshot = await getDocs(customerOrdersQuery)
      //   querySnapshot.forEach((snap) => {
      //     console.log(JSON.stringify(snap.data()))
      //   })
      // },

      //Fredrik ska lägga till timestamp funktion i detectMove
      detectMove(evt) {
        //hämtar namnet på columnen via CSS klassnamn
        let status = evt.to.parentNode.className
        //hämtar uuid:t på tasken
        let id = evt.dragged.id
        //filtrerar ut och hittar det specifika elementet
        let find = this.arrayOfTasks.filter((el) => {
          return el.uuid === id
        })
        this.targetObject = find
        //uppdaterar status nyckeln till den specifika columnens namn
        this.targetObject[0].status = status
        this.updateStatus()
        new Date().toLocaleString()
      },
      selectProjectName(evt) {
        this.projectName = evt.target.value
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
      getTask(tasks) {
        this.task = tasks
        console.log('här ska du se' + this.tasks)
      }
    }
  }
</script>

<template>
  <AddNewTask @sendTask="getTask" />
  <time-stamp />
  <div v-if="this.arrayOfProjectNames !== null">
    <select @change="selectProjectName">
      <option>Select a project</option>
      <option v-for="projects in this.arrayOfProjectNames" :key="projects.id">
        {{ projects.id }}
      </option>
    </select>
    <h2>Project: {{ this.projectName }}</h2>
  </div>

  <article class="flex-container">
    <sprint-list title="todo">
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
            class="drag-element"
          />
        </draggable>
      </section>
    </sprint-list>

    <sprint-list title="In Progress">
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
            class="drag-element"
          />
        </draggable>
      </section>
    </sprint-list>

    <sprint-list title="Review">
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
            class="drag-element"
          />
        </draggable>
      </section>
    </sprint-list>

    <sprint-list title="Done">
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
    margin: 30px;
    display: flex;
    grid-template-columns: auto;
    justify-content: space-evenly;
    text-align: center;
    border-radius: 10px;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .TODO,
  .REVIEW,
  .IN_PROGRESS,
  .DONE {
    background-color: rgba(238, 221, 221, 0.418);
    width: 200px;
    border-radius: 10px;
    min-height: 60vh fit-content;
    flex-wrap: wrap;
    margin-bottom: 5rem;
  }

  .drag-element {
    font-size: 1.5rem;
    text-align: center;
    color: black;
    width: 200px;
    height: 6rem;
    background-color: white;
    border-radius: 10px;
    border-style: solid;
    border-color: rgba(51, 52, 58, 0.514);
    min-height: 10px;
    cursor: grab;
  }
  .on-drag {
    background-color: rgba(143, 81, 194, 0.404);
    color: #fff;
    z-index: 10;
  }
  .drop-zone-height {
    height: 60vh;
  }
</style>
<!-- Todo:
1. Skapa en vit jävla bakgrund med opacity så den är genomskinlig.
2. skapa en section som innehåller allt.
3. skapa divar.
4. divarna ska ingå i flex-grid. (Space between? Kanske får se.)
 -->
