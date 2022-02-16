<template>
  <div v-if="$store.state.arrayOfObjects !== null" id="userstories">
    <label for="PBI">Select PBI: </label>
    <select
      class="form-select form-select-sm"
      aria-label=".form-select-sm example"
      v-model="selectedObject"
    >
      <option
        v-for="object in this.$store.state.arrayOfObjects"
        :key="object.id"
        :value="object.id"
        id="PBI"
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
        selectedObject: ''
      }
    },
    created() {
      this.getDatabase()
      console.log('Databas ' + this.$store.state.arrayOfObjects)
      console.log('Sökväg / användare ' + this.$store.state.projectName)
    },
    methods: {
      //Snapshot of all documents as Objects & Keys.
      getDatabase() {
        const colRef = collection(firestore, `${this.$store.state.projectName}`)
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
    margin: 4rem 10rem;
    width: 25rem;
    display: flex;
    flex-direction: column;
    label {
      font-size: 2.8rem;
      font-weight: 500;
    }

    p {
      text-align: center;
      font-size: 1.6rem;
      font-weight: bold;
      margin-top: 4.2rem;
    }
    select {
      width: 20rem;
      height: 3rem;
      display: inline;
      border-radius: 10px;
    }
  }
</style>

<!--
  todo
- I dropdown-menyn ska userstories synas
-->
