<script>
  import NavbarComponent from './components/NavbarComponent.vue'
  import CrumbleFooter from './components/CrumbleFooter.vue'

  export default {
    components: { NavbarComponent, CrumbleFooter }
  }
</script>

<template>
  <div class="main-app-container">
    <NavbarComponent />

    <main class="main-container-view">
      <RouterView />
    </main>
  </div>
  <CrumbleFooter />
</template>
<style lang="scss">
  .main-app-container {
    margin-top: 10rem;
  }
</style>
