<script>
  import { db } from '../firebase.js'
  import { deleteDoc } from 'firebase/firestore'
  export default {
    props: {
      removeTask: {
        type: Image,
        default: null
      }
    },
    data() {
      return {}
    },

    methods: {
      async deleteTask(doc) {
        if (confirm('Are you sure?')) {
          await deleteDoc(
            doc(db, 'Nu skall allt fungera...', 'Mycket enklare med en knapp!')
          )
          console.log('Document successfully Deleted???????? MAYBE?')
        }
      }
    }
  }
</script>
<template>
  <img src="/assets/trash-can.png" alt="" @click="deleteTask" />
</template>

<style lang="scss" scoped>
  img {
    display: flex;
    width: 15px;
    height: 15px;
    cursor: pointer;
    align-self: flex-end;
    margin-right: 3px;
    margin-bottom: 3px;
  }
</style>
