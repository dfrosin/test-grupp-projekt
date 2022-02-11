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
        this.$store.commit('setLoggedInUser', null)
        this.$router.push('/login')
        console.log()
      }
    }
  }
</script>
