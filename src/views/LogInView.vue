<template>
  <h1>Sign In</h1>
  <LogInComponent />
</template>

<script>
  import LogInComponent from '../components/LogInComponent.vue'

  export default { components: { LogInComponent } }
</script>
<style lang="scss" scoped>
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
