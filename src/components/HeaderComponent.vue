<script>
  export default {
    name: 'HeaderComponent',
    props: {
      taskname: {
        type: String,
        default: 'test'
      }
    }
  }
</script>

<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>
