<script>
  import { firebaseApp } from '../firebase.js'
  import SprintList from '../components/SprintList.vue'
  import SprintCard from '../components/SprintCard.vue'
  import { VueDraggableNext } from 'vue-draggable-next'

  export default {
    // created() {
    //   const colRef = collection(db, 'Adamstest')

    //   getDocs(colRef).then((snapshot) => {
    //     snapshot.docs.forEach((doc) => {
    //       this.todo.push({ ...doc.data(), id: doc.id })
    //     })
    //     this.arrayOfObjects = this.todo
    //     console.log(this.todo)
    //   })
    // },
    data() {
      return {
        enabled: true,
        inProgress: [],
        review: [],
        done: [],
        dragging: false,
        todo: []
      }
    },
    mounted() {
      this.ab.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            if (change.doc.data().status === 'TODO') {
              this.todo.push({
                id: change.doc.id,
                ...change.doc.data()
              })
            } else if (change.doc.data().status === 'DONE') {
              this.done.push({
                id: change.doc.id,
                ...change.doc.data()
              })
            } else if (change.doc.data().status === 'REVIEW') {
              this.review.push({
                id: change.doc.id,
                ...change.doc.data()
              })
            } else {
              this.inProgress.push({
                id: change.doc.id,
                ...change.doc.data()
              })
            }
          }
        })
      })
    },
    watch: {
      todo(value) {
        value.map((todo) => {
          this.firebaseApp.doc(todo.id).update({
            status: 'TODO',
            todo: todo.todo
          })
        })
      },
      inProgress(value) {
        value.map((todo) => {
          this.firebaseApp.doc(todo.id).update({
            status: 'IN_PROGRESS',
            todo: todo.todo
          })
        })
      },
      review(value) {
        value.map((todo) => {
          this.firebaseApp.doc(todo.id).update({
            status: 'REVIEW',
            todo: todo.todo
          })
        })
      },
      done(value) {
        value.map((todo) => {
          this.firebaseApp.doc(todo.id).update({
            status: 'DONE',
            todo: todo.todo
          })
        })
      }
    },
    computed: {
      ab() {
        return firebaseApp.firestore().collection('Adamstest')
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
    <sprint-list title="Todo">
      <section class="drop-zone">
        <draggable
          :list="todo"
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
      <section class="drop-zone">
        <draggable
          :list="inProgress"
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
      <section class="drop-zone">
        <draggable
          :list="review"
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
      <section class="drop-zone">
        <draggable
          :list="done"
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

  .drop-zone {
    background-color: rgb(233, 144, 144);
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
    border-color: green;
    min-height: 10px;
    cursor: grab;
  }
  .on-drag {
    background-color: rgb(81, 89, 194);
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
