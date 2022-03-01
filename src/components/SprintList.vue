<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },

    data() {
      return {}
    }
  }
</script>

<template>
  <div class="sprint-list">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
  h3 {
    color: white;
  }
</style>
