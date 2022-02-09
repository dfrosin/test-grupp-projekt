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
    <button @click="getInformation" class="btn btn-success mt-3 col-2">
      Get Data from server
    </button>
  </div>
</template>

<script>
  import { db, firestore } from '../firebase2'
  import { collection, doc, updateDoc } from 'firebase/firestore'
  //  * setDoc är en funktion som lägger till användaren
  //  * collection är i vilken "mapp" man skall lägga till användaren
  //   båda måste hämtas i den aktuella komponenten man vill lägga till

  import { getDocs } from 'firebase/firestore'
  // * getDocs är en GET funktion som hämtar data

  export default {
    data() {
      return {
        firstName: '',
        email: '',
        born: 0
      }
    },
    methods: {
      makeNewUser() {
        // --------------- SKAPA NY ------------------------------ //

        // const firestore är: getFirestore()
        // mondayCollection är ett enklare sätt att skriva nestlad data.

        const mondayCollection = doc(firestore, 'tasks/monday')
        // const docData = {
        //   name: this.firstName,
        //   email: this.email
        // }
        const updateData = {
          email: 'update@newuser.com'
        }
        // setDoc(mondayCollection, docData)
        updateDoc(mondayCollection, updateData)
        //setDoc skapar ny data och skriver över existerande data om det finns.
        //updateDoc uppdaterar den informationen du vill uppdatera, men behåller resterande
        // --------------- SKAPA NY ------------------------------ //
      },
      async getInformation() {
        const querySnapshot = await getDocs(collection(db, 'users'))
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  * {
    color: black;
  }
</style>
