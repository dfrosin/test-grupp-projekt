<template lang="">
  <button class="btn btn-primary" type="submit" @click.prevent="action">
    {{ buttonvalue }}
  </button>
</template>
<script>
  export default {
    data() {
      return {}
    },
    props: {
      buttonvalue: {
        type: String,
        default: ''
      }
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  button {
    width: 8rem;
    border-radius: 10px;
  }
</style>
