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
    <div v-if="arrayOfPbItems" class="backlog-container">
      <ul>
        <BackLogList :array="arrayOfPbItems" />
      </ul>
    </div>
    <ButtonComponent buttonvalue="Create Task" />
  </div>
</template>

<script>
  import ButtonComponent from './ButtonComponent.vue'
  import { db, firestore } from '../firebase'
  import { doc, setDoc } from 'firebase/firestore'
  import BackLogList from './BackLogList.vue'

  export default {
    data() {
      return {
        pbItem: '',
        backlogItemInfo: {
          antalTasks: 0,
          color: ''
        },
        arrayOfPbItems: [],
        docId: ''
      }
    },
    methods: {
      createAccount() {
        // --------------- SKAPA NY ANVÄNDARE------------------------------ //
        const whereToAddData = doc(firestore, `PBI/${this.pbItem}`)
        setDoc(whereToAddData, this.backlogItemInfo)
        this.pbItem = ''
        this.$refs.firstInput.focus()
        this.getAllDocumentsInCollection()
        // this.listenToADocument()

        // this.getArrayofAllDocumentsInCollection()
      },
      //skickar tillbaka en Array med alla PB Items. Alltså hur många PB det finns.
      //Hur många divvar den skall skapa. Denn funktionen körs varje gång jag trycker enter.
      //Kanske borde byta till att den lyssnar på uppdateringar?
      // getArrayofAllDocumentsInCollection() {
      //   db.collection('PBI')
      //     .get()
      //     .then((snapshot) => {
      //       console.log(snapshot.docs)
      //     })
      // },

      //Hämtar "överskriften" alltså id:t till PBI.
      getAllDocumentsInCollection() {
        db.collection('PBI')
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              this.arrayOfPbItems.push(doc.id)
              console.log(doc.id)
            })
          })
      }
      //listenToADocument är som en watch, den känner av ändringar som blivit gjorda i firebase och skickar tillbaka informationen till konsollen
      // listenToADocument() {
      //   const query = db.collection('PBI').where('antalTasks', '==', 0)

      //   const observer = query.onSnapshot(
      //     (querySnapshot) => {
      //       console.log(`Received query snapshot of id ${querySnapshot.id}`)
      //       console.log('Detta är Observer' + observer)
      //     },
      //     (err) => {
      //       console.log(`Encountered error: ${err}`)
      //     }
      //   )
      // }
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
