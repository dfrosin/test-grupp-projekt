<script>
  import GetStartedButton from '../components/GetStartedButton.vue'

  export default { components: { GetStartedButton } }
</script>

<template>
  <div>
    <img src="/assets/pagelogo.png" alt="" />
    <h1>Crumble, the sweetest way to scrum</h1>
    <GetStartedButton />
  </div>
</template>

<style lang="scss" scoped>
  div {
    color: rgb(255, 255, 255);
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
