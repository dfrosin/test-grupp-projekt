<script>
  import { firestore } from '../firebase.js'
  import { deleteDoc, doc } from 'firebase/firestore'
  export default {
    props: {},
    data() {
      return {}
    },

    methods: {
      async deleteTask() {
        if (confirm('Are you sure?')) {
          console.log('Din funktion anropas Adam')
          const whereToAddData = doc(
            firestore,
            'Nu skall allt fungera.../Men se till att det fungerar då!'
          )
          await deleteDoc(whereToAddData)
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
