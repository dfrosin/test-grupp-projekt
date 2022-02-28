<script>
  /* import TestTest from '../components/TestTest.vue' */
  import ButtonComponent from '../components/ButtonComponent.vue'

  export default {
    components: { ButtonComponent } /* { TestTest } */
  }
</script>

<template>
  <div class="home-view-container">
    <h1>hemma bäst men borta bra?</h1>
    <ButtonComponent name="test" />
  </div>
  <!--  <TestTest /> -->
</template>
