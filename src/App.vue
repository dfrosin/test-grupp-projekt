<script>
  import UserCreate from './components/UserCreate.vue'
  import UserList from './components/UserList.vue'
  import EditName from './components/EditName.vue'
  import NavbarComponent from './components/NavbarComponent.vue'

  export default {
    components: {
      UserCreate,
      UserList,
      EditName,
      NavbarComponent
    }
  }
</script>

<template>
  <NavbarComponent />
  <UserCreate />
  <UserList />
  <EditName />
  <main>
    <RouterView />
  </main>
</template>
<style lang="scss">
  body {
    margin-top: 50px;
  }
</style>
