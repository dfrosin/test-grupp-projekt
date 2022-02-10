<template>
  <div id="container">
    <form @submit.prevent="createAccount">
      <div class="inputs">
        <label>Username</label>
        <input
          placeholder="Name"
          v-model="userName"
          class="form-control"
          required
        />
      </div>
      <div class="inputs">
        <label>Email</label>
        <input
          placeholder="Email"
          v-model="email"
          class="form-control"
          type="email"
          required
        />
      </div>
      <div class="inputs">
        <label>Password</label>
        <input
          placeholder="Name"
          v-model="password"
          class="form-control"
          type="password"
          required
        />
      </div>
      <div class="inputs">
        <label>Confirm password</label>
        <input
          placeholder="Name"
          v-model="confirmPassword"
          class="form-control"
          type="password"
          required
        />
      </div>
    </form>
    <button @click="createAccount" class="btn btn-success mt-3">
      Create account
    </button>
  </div>
</template>

<script>
  import { firestore } from '../firebase'
  import { doc, setDoc } from 'firebase/firestore'

  export default {
    data() {
      return {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    methods: {
      createAccount() {
        console.log('hej')
        // --------------- SKAPA NY ANVÄNDARE------------------------------ //
        const newUser = {
          userName: this.userName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        }
        const whereToAddData = doc(firestore, `Andreas/${this.userName}`)
        setDoc(whereToAddData, newUser)
        this.$store.commit('setLoggedInUser', newUser)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    button {
      width: 10%;
      margin: 0 45%;
    }
  }
  .inputs {
    display: flex;
    flex-direction: column;
    input {
      width: 30%;
      margin: 1rem 35%;
    }
  }
  form {
    label {
      margin-left: 35%;
      color: black;
    }
  }
</style>

<!--
  Todo
- Alla fält ska vara obligatoriska - check
- Uppgifterna sparas i backend - check
- Uppgifterna sparas i webstorage - check
- google-inlogg?
-->
