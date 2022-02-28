<script>
  export default {
    created() {
      fetch('https://avancera.app/cities/')
        .then((response) => response.json())
        .then((cities) => {
          this.cities = cities
        })
    },
    data() {
      return {
        cities: null
      }
    }
  }
</script>

<template>
  <ol>
    <li :key="city.id" v-for="city in cities">{{ city.name }}</li>
  </ol>
</template>
