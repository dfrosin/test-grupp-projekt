<script>
  import NavbarComponent from './components/NavbarComponent.vue'
  import CrumbleFooter from './components/CrumbleFooter.vue'
  /* import LogInComponent from './components/LogInComponent.vue' */
  export default {
    components: { NavbarComponent, CrumbleFooter }
  }
</script>

<template>
  <div class="main-app-continer">
    <NavbarComponent />

    <main class="main-continer-view">
      <RouterView />
    </main>
  </div>
  <CrumbleFooter />
</template>
<style lang="scss"></style>
