<template>
  <li>{{ this.items }}</li>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      items: {
        type: Array,
        Object,
        default: null
      }
    }
  }
</script>

<style lang="scss" scoped></style>
