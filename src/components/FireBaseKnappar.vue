<template>
  <div class="test">
    <div class="card card-body mt-4">
      <form @submit.prevent="makeNewUser">
        <div class="form-group">
          <label>Firstname</label>
          <input
            placeholder="Firstname"
            v-model="newUser.firstName"
            class="form-control"
          />
        </div>
        <div class="form-group mt-3">
          <label>Lastname</label>
          <input
            placeholder="Lastname"
            v-model="newUser.lastName"
            class="form-control"
          />
        </div>
        <div class="form-group mt-3">
          <label>Email</label>
          <input
            placeholder="Email"
            v-model="newUser.email"
            class="form-control"
          />
        </div>
      </form>
      <button @click="createAccount" class="btn btn-success mt-3 col-2">
        Lägger till Användare innuti Andreas
      </button>
      <button @click="addANewDocument" class="btn btn-success mt-3 col-2">
        Add new Collection and User
      </button>
      <button
        @click="addANewDocumentInCollection"
        class="btn btn-success mt-3 col-2"
      >
        Add A New Document In Collection
      </button>
    </div>
  </div>
</template>

<script>
  import { firestore } from '../firebase'
  import { doc, setDoc, collection, addDoc } from 'firebase/firestore'
  export default {
    data() {
      return {
        newUser: {
          firstName: '',
          lastName: '',
          email: ''
        }
      }
    },
    methods: {
      async addANewDocument() {
        const Newcollection = collection(firestore, 'Andreas')
        const newDoc = await addDoc(Newcollection, this.newUser)
        console.log(newDoc.path)
      },

      createAccount() {
        // --------------- SKAPA NY ANVÄNDARE------------------------------ //
        const whereToAddData = doc(
          firestore,
          `Andreas/${this.newUser.firstName}`
        )
        setDoc(whereToAddData, this.newUser)
      }
    },
    async addANewDocumentInCollection() {
      console.log('Det fungerar')
      const Newcollection = collection(firestore, 'erika/Johanna/')
      const newDoc = await addDoc(Newcollection, {
        color: 'red'
      })
      console.log(newDoc.path)
    }
  }
</script>

<style lang="scss" scoped>
  .test {
    margin-top: 10rem;
  }
</style>
