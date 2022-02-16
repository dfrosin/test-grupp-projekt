<script>
  import CreateInputButton from '../components/CreateInputButton.vue'
  import ChooseUserstorie from '../components/ChooseUserstorie.vue'
  import StartSprint from '../components/StartSprint.vue'
  import SelectColor from '../components/SelectColor.vue'

  export default {
    components: {
      CreateInputButton,
      ChooseUserstorie,
      StartSprint,
      SelectColor
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
    <h2>CreateSprintView.vue</h2>
    <ChooseUserstorie />
    <SelectColor @send-info="getColor" />
    <CreateInputButton />
    <StartSprint />
  </div>
</template>

<style lang="scss" scoped>
  // #container {
  //   background-color: rgba(255, 235, 205, 0.39);
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   flex-direction: column;
  //   margin-top: 4.2rem;
  //   width: 80%;
  //   margin: 0 10%;
  //   display: flex;
  //   flex-wrap: wrap;
  //   margin-top: 10rem;
  // }
  // h1 {
  //   margin-top: 4.2rem;
  // }
</style>
