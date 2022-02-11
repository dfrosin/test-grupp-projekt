<template>
  <button @click="handleLogout" class="btn btn-success mt-3">Logga ut</button>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      handleLogout() {
        console.log('du är utloggad')
        this.$store.commit('setLoggedInUser')
        this.$router.push('/login')
        console.log(this.$store.state.loggedInUser)
      }
    }
  }
</script>
