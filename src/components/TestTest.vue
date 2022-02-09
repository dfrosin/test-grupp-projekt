<template>
  <div class="card card-body mt-4">
    <form @submit.prevent="makeNewUser">
      <div class="form-group">
        <label>Name</label>
        <input placeholder="Namn" v-model="firstName" class="form-control" />
      </div>
      <div class="form-group mt-3">
        <label>Email</label>
        <input placeholder="Email" v-model="email" class="form-control" />
      </div>
      <div class="form-group mt-3">
        <label>Born</label>
        <input placeholder="Born" v-model="born" class="form-control" />
      </div>
      <button type="submit" class="btn btn-success mt-3">Create User</button>
    </form>
    <button @click="readASingleDocument" class="btn btn-success mt-3 col-2">
      Get Data from server
    </button>
    <button @click="addANewDocument" class="btn btn-success mt-3 col-2">
      Add document
    </button>
    <button @click="listenToADocument" class="btn btn-success mt-3 col-2">
      Listen
    </button>
    <button @click="queryForDocuments" class="btn btn-success mt-3 col-2">
      Log all items
    </button>
  </div>
</template>

<script>
  import { firestore } from '../firebase2'
  import {
    collection,
    doc,
    updateDoc,
    addDoc,
    getDoc,
    onSnapshot,
    getDocs,
    query,
    where,
    limit
  } from 'firebase/firestore'
  //  * setDoc är en funktion som lägger till användaren
  //  * collection är i vilken "mapp" man skall lägga till användaren
  //   båda måste hämtas i den aktuella komponenten man vill lägga till

  // import { getDocs } from 'firebase/firestore'
  // * getDocs är en GET funktion som hämtar data

  export default {
    data() {
      return {
        firstName: '',
        email: '',
        born: 0
      }
    },
    computed: {
      // ordersCollection() {
      //   const AdamsCollection = collection(firestore, 'Adam')
      //   return AdamsCollection
      // }
    },
    methods: {
      makeNewUser() {
        // --------------- SKAPA NY ------------------------------ //

        // const firestore är: getFirestore()
        // mondayCollection är ett enklare sätt att skriva nestlad data.

        const whereToAddData = doc(firestore, 'tasks/monday')
        //task/monday går att byta ut till vad vi vill ha
        // whereToAddData är ett kortare sätt att skriva det på
        // const docData = {
        //   name: this.firstName,
        //   email: this.email
        // }
        const updateData = {
          email: this.email
        }
        //const updateData måste vara objekt
        //setDoc skapar ny data och skriver över existerande data om det finns.
        updateDoc(whereToAddData, updateData)
        //updateDoc uppdaterar den informationen du vill uppdatera, men behåller resterande
        // --------------- SKAPA NY ------------------------------ //
      },
      //addANewDocument lägger till ett nytt dokument med inmatad information till firebase.
      //AdamsCollection innehåller en absolut sökväg för vilken collection den lägger sig i.
      //Adam byts ut till den aktuella mappen man vill lägga in data i.
      async addANewDocument() {
        const AdamsCollection = collection(firestore, 'Adam')
        const newDoc = await addDoc(AdamsCollection, {
          customer: 'Fredrik',
          drink: 'Beer'
        })
        console.log(newDoc.path)
      },
      //hämtar ut det som ligger i task/monday
      async readASingleDocument() {
        const whereToAddData = doc(firestore, 'tasks/monday')
        const mySnapshot = await getDoc(whereToAddData)
        if (mySnapshot.exists()) {
          const docData = mySnapshot.data()
          console.log(docData.email)
        }
      },
      //listenToADocument är som en watch, den känner av ändringar som blivit gjorda i firebase och skickar tillbaka informationen till konsollen
      listenToADocument() {
        const whereToAddData = doc(firestore, 'tasks/monday')
        onSnapshot(whereToAddData, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const docData = docSnapshot.data()
            console.log(`in realtime, docData is ${JSON.stringify(docData)}`)
          }
        })
      },
      //queryForDocuments den hämtar alla values i objektet
      async queryForDocuments() {
        const customerOrdersQuery = query(
          collection(firestore, 'Adam'),
          where('customer', '==', 'Fredrik'),
          limit(11)
        )
        const querySnapshot = await getDocs(customerOrdersQuery)
        querySnapshot.forEach((snap) => {
          console.log(` ${JSON.stringify(snap.data())}`)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  input,
  input:focus {
    color: black;
  }
</style>
