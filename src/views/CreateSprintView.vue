<script>
  import CreateInputButton from '../components/CreateInputButton.vue'
  import ChooseUserstorie from '../components/ChooseUserstorie.vue'
  import StartSprint from '../components/StartSprint.vue'

  export default {
    components: {
      CreateInputButton,
      ChooseUserstorie,
      StartSprint
    },

    methods: {
      getColor() {
        console.log('hej')
      }
    }
  }
</script>

<template>
  <div id="container">
    <ChooseUserstorie />
    <CreateInputButton />
    <StartSprint />
  </div>
</template>

<style lang="scss" scoped>
  #container {
    color: white;
    padding: 4px;
    background-color: rgba(255, 235, 205, 0.39);
    width: 85%;
    height: fit-content;
    margin: auto;
    margin-top: 10rem;
  }
</style>
