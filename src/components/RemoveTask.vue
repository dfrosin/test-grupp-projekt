<script>
  import { firestore } from '../firebase.js'
  import { deleteDoc, doc } from 'firebase/firestore'
  export default {
    props: {
      deleteid: {
        type: String,
        default: ''
      },
      board: {
        type: [String, Number],
        default: ''
      },
      taskname: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      return {}
    },

    methods: {
      async deleteTask(board, id, taskname) {
        if (confirm(`Är du säker på att du vill radera task: ${taskname}`)) {
          console.log(this.taskname)
          console.log('Din funktion anropas Adam')
          console.log(' Delete task:', board, id)
          await deleteDoc(doc(firestore, board, id))
        }
      }
    }
  }
</script>
<template>
  <img
    src="/assets/trash-can.png"
    alt="Adams matlåda"
    @click="deleteTask(board, deleteid, taskname)"
  />
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
