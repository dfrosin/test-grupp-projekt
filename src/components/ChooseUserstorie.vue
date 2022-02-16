<template>
  <div id="userstories">
    <p>Select userstorie</p>
    <select
      class="form-select form-select-sm"
      aria-label=".form-select-sm example"
      v-model="selectedObject"
    >
      <option selected>Select userstorie</option>
      <option
        v-for="object in arrayOfObjects"
        :key="object.id"
        :value="object.id"
      >
        {{ object.id }}
      </option>
    </select>
  </div>
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
  #userstories {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      text-align: center;
      font-size: 1.6rem;
      font-weight: bold;
      margin-top: 4.2rem;
    }
  }
</style>

<!--
  todo
- I dropdown-menyn ska userstories synas
-->
