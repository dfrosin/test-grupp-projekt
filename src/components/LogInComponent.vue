<script>
  import { firestore } from '../firebase'
  import { getDocs, query, collection, where, limit } from 'firebase/firestore'
  export default {
    data() {
      return {
        userName: '',
        password: ''
      }
    },
    methods: {
      async onSubmit() {
        const customerOrdersQuery = query(
          collection(firestore, 'Andreas'),
          where('userName', '==', this.userName),
          limit(10)
        )
        const querySnapshot = await getDocs(customerOrdersQuery)
        querySnapshot.forEach((snap) => {
          console.log(` ${JSON.stringify(snap.data())}`)
          this.$store.commit('setLoggedInUser', snap.data())
        })
      },
      handleLogout() {
        console.log('du är utloggad')
        this.$store.commit('setLoggedInUser', null)
        this.$router.push('/login')
        console.log(this.$store.state.loggedInUser)
      }
    }
  }
</script>

<template>
  <div id="container">
    <form @submit.prevent="onSubmit">
      <div class="inputs">
        <label>Username</label>
        <input
          placeholder="Username"
          required
          v-model="userName"
          class="form-control"
        />
      </div>
      <div class="inputs">
        <label>Password</label>
        <input
          placeholder="password"
          type="password"
          required
          v-model="password"
          class="form-control"
        />
      </div>
    </form>
    <button @click="onSubmit" class="btn btn-success mt-3">Log In</button>
  </div>

  <button @click="handleLogout" class="btn btn-success mt-3">Logga ut</button>
</template>

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
- Username syns i navbaren när man är inloggad -check
- google-inlogg?
-->
