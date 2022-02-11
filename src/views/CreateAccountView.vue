<template>
  <h1>Create a new account</h1>
  <CreateAccount />
</template>

<script>
  import CreateAccount from '../components/CreateAccount.vue'

  export default { components: { CreateAccount } }
</script>

<style lang="scss" scoped>
  * {
    margin-top: 4.2rem;
  }
  h1 {
    text-align: center;
    color: black;
    width: 20%;
    margin: 20% 40% 5% 40%;
  }
  p {
    color: black;
    width: 10%;
    margin: 1rem 45% 0 45%;
    text-align: center;
  }
</style>
