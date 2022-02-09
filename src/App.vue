<script>
  import NavbarComponent from './components/NavbarComponent.vue'
  export default {
    components: { NavbarComponent }
  }
</script>

<template>
  <NavbarComponent />
  <nav>
    <ul>
      <li>
        <RouterLink to="/">Hem</RouterLink>
      </li>
      <li>
        <RouterLink to="/about">Om</RouterLink>
      </li>
      <li>
        <RouterLink to="/contact">Kontakt</RouterLink>
      </li>
    </ul>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
<style lang="scss">
  body {
    margin-top: 50px;
  }
</style>
