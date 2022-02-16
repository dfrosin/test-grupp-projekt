<template>
  <select
    class="form-select form-select-sm"
    aria-label=".form-select-sm example"
    v-model="selectedObject"
  >
    <option selected>Choose userstorie</option>
    <option
      v-for="object in arrayOfObjects"
      :key="object.id"
      :value="object.id"
    >
      {{ object.id }}
    </option>
  </select>
</template>

<script>
  import { firestore } from '../firebase'
  import { getDocs, collection } from 'firebase/firestore'
  // import store from '../store'

  export default {
    data() {
      return {
        arrayOfObjects: [],
        selectedObject: null
      }
    },
    created() {
      this.getDatabase()
    },
    methods: {
      //Snapshot of all documents as Objects & Keys.
      getDatabase() {
        const colRef = collection(firestore, 'PBI')
        // const colRef = collection(firestore, store.state.projectName)

        getDocs(colRef).then((snapshot) => {
          let PBI = []
          snapshot.docs.forEach((doc) => {
            PBI.push({ ...doc.data(), id: doc.id })
          })
          this.arrayOfObjects = PBI
          console.log(PBI)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-select {
    width: 100px;
    display: flex;
    flex-direction: column;
  }
</style>

<!--
  todo
- I dropdown-menyn ska userstories synas
-->
