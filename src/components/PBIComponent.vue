<template>
  <div class="component">
    <h1>Product Backlog</h1>
    <input
      v-model="pbItem"
      class="first-input"
      type="text"
      placeholder="Som en ___ vill jag ___ för att ___"
      ref="firstInput"
      @keyup.enter="createAccount"
    />
    <div v-if="this.items" class="backlog-container">
      <ul v-for="lists in this.items" :key="lists.id">
        <BackLogList :items="items" />
      </ul>
    </div>
    <ButtonComponent buttonvalue="Create Task" />
  </div>
</template>

<script>
  import ButtonComponent from './ButtonComponent.vue'
  import { firestore } from '../firebase'
  import { doc, setDoc, query, where, limit, getDocs } from 'firebase/firestore'
  import BackLogList from './BackLogList.vue'

  export default {
    data() {
      return {
        pbItem: '',
        backlogItemInfo: {
          antalTasks: 0,
          color: ''
        },
        items: []
      }
    },
    methods: {
      createAccount() {
        // --------------- SKAPA NY ANVÄNDARE------------------------------ //
        const whereToAddData = doc(firestore, `PBI/${this.pbItem}`)
        setDoc(whereToAddData, this.backlogItemInfo)
        this.pbItem = ''
        this.$refs.firstInput.focus()
        this.queryForDocuments()
      },
      async queryForDocuments() {
        const customerOrdersQuery = query(
          doc(firestore, 'PBI'),
          where('antalTasks', '==', 0),
          limit(10)
        )
        const querySnapshot = await getDocs(customerOrdersQuery)
        querySnapshot.forEach((snap) => {
          this.items.push(JSON.stringify(snap.data()))
          // console.log(` ${JSON.stringify(snap.data())}`)
        })
        console.log('Detta är listan över pbItems' + this.items)
      }
    },

    components: { ButtonComponent, BackLogList }
  }
</script>

<style lang="scss" scoped>
  .component {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(10, 1fr);
    background-color: rgba(255, 235, 205, 0.39);
    width: 85%;
    height: 80vh;
    margin: auto;
    margin-top: 10rem;
    .first-input {
      grid-row: 4;
      grid-column: 1;
      padding: 0.3rem;
      border-radius: 10px;
      font-size: 1.8rem;
      width: 30rem;
      margin-left: 3.5rem;
      align-self: center;
    }
    h1 {
      padding: 4rem;
    }
    .btn {
      grid-column: 1;
      grid-row: 8;
      align-self: center;
      justify-self: center;
    }
    .backlog-container {
      grid-column: 2;
      grid-row: 2/10;
      .pb-item {
        grid-row: 9;
        padding: 0.3rem;
        border-radius: 10px;
        font-size: 1.8rem;
        width: 30rem;
        margin-left: 3.5rem;
      }
    }
  }
</style>
