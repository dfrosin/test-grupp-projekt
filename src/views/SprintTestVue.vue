<script>
  import { db } from '../firebase.js'
  import { collection, getDocs } from 'firebase/firestore'
  // import {
  //   where,
  //   limit,
  //   collection,
  //   query,
  //   getDocs,

  // } from 'firebase/firestore'
  import SprintList from '../components/SprintList.vue'
  import SprintCard from '../components/SprintCard.vue'
  import { VueDraggableNext } from 'vue-draggable-next'

  export default {
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
        targetObject: null
      }
    },

    mounted() {
      this.getDatabase()
    },
    methods: {
      getDatabase() {
        const colRef = collection(db, 'Adamstest')

        getDocs(colRef).then((snapshot) => {
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
      detectMove(evt) {
        let status = evt.to.parentNode.className
        let id = evt.dragged.id

        let find = this.arrayOfTasks.filter((el) => {
          return el.id === id
        })
        this.targetObject = find
        this.targetObject[0].status = status
        console.log(evt)
        this.targetObject = null
      }
    },
    components: {
      SprintList,
      SprintCard,
      draggable: VueDraggableNext
    }
  }
</script>

<template>
  <h2>Project: {{ this.$store.state.projectName }}</h2>
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
