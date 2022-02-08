<script>
  import UserCreate from './components/UserCreate.vue'
  import UserList from './components/UserList.vue'
  import EditName from './components/EditName.vue'

  export default {
    components: {
      UserCreate,
      UserList,
      EditName
    }
  }
</script>

<template>
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
  <UserCreate />
  <UserList />
  <EditName />
  <main>
    <RouterView />
  </main>
</template>
