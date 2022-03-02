<script>
  import CreateTasks from '../components/CreateTasks.vue'
  import StartSprint from '../components/StartSprint.vue'

  export default {
    components: {
      CreateTasks,
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
    <CreateTasks />
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
    padding-bottom: 120px;
  }
</style>
