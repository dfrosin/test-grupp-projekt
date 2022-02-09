<template>
  <div>
    <img src="/assets/pagelogo.png" alt="" />
    <h1>Crumble, the sweetest way to scrum</h1>
    <GetStartedButton />
  </div>
</template>

<script>
  import GetStartedButton from '../components/GetStartedButton.vue'

  export default { components: { GetStartedButton } }
</script>

<style lang="scss" scoped>
  div {
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      text-align: center;
    }
    img {
      height: 210px;
      width: 200px;
    }
  }
</style>
