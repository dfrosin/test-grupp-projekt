<script>
  export default {
    props: {
      item: {
        type: [String, Object, Number, Array],
        default: ''
      }
    },
    data() {
      return {}
    }
  }
</script>
<template>
  <div class="sprint-card" :id="item.uuid" :style="{ borderColor: item.color }">
    {{ item.name }}
  </div>
</template>

<style lang="scss" scoped>
  .sprint-card {
    border: 2px solid white;
  }
</style>
