<script>
  import { auth } from '../firebase'

  export default {
    data() {
      return {}
    },
    methods: {
      async handleLogout() {
        await auth.signOut()
        this.$store.commit('setLoggedInUser', null)
        this.$router.push('/login')
        console.log(this.$store.state.loggedInUser)
      }
    }
  }
</script>
<template>
  <button @click="handleLogout" type="submit" class="btn">Log out</button>
</template>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  .btn {
    color: white;
    cursor: pointer;
    font-size: 14px;
    transition: 0.5s ease all;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
    &:hover {
      color: #ffffff;
      border-color: #00afea;
      background-color: #00afea;
    }
  }
</style>

<!--
//   Todo
//   När man trycker på knappen ska user loggas ut
//   Lägg till push router till login
//   lägg till styling för knappen
//   -->
