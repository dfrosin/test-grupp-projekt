<script>
  import NavbarComponent from './components/NavbarComponent.vue'
  /* import LogInComponent from './components/LogInComponent.vue' */
  export default {
    components: { NavbarComponent }
  }
</script>

<template>
  <div class="main-app-continer">
    <NavbarComponent />

    <main class="main-continer-view">
      <RouterView />
    </main>
  </div>
</template>
<style lang="scss"></style>
