<script>
  import CreateAccount from '../components/CreateAccount.vue'

  export default { components: { CreateAccount } }
</script>

<template>
  <h1>Create a new account</h1>
  <CreateAccount />
</template>

<style lang="scss" scoped>
  * {
    margin-top: 4.2rem;
  }
  h1 {
    text-align: center;
    color: #fff;
    width: 20%;
    margin: 20% 40% 5% 40%;
  }
  p {
    color: #fff;
    width: 10%;
    margin: 1rem 45% 0 45%;
    text-align: center;
  }
</style>
