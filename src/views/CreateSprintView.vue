<script>
  import CreateInputButton from '../components/CreateInputButton.vue'
  import ChooseUserstorie from '../components/ChooseUserstorie.vue'
  export default {
    components: {
      CreateInputButton,
      ChooseUserstorie
    }
  }
</script>

<template>
  <div id="container">
    <h2>CreateSprintView.vue</h2>
    <ChooseUserstorie />
    <CreateInputButton />
  </div>
</template>

<style lang="scss" scoped>
  #container {
    background-color: rgba(255, 235, 205, 0.39);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 4.2rem;
  }
  h2 {
    margin-top: 4.2rem;
  }
</style>
