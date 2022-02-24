<script>
  import AddUser from './AddUser.vue'
  export default {
    props: {
      item: {
        type: [String, Object, Number, Array],
        default: ''
      }
    },
    data() {
      return {}
    },
    components: { AddUser }
  }
</script>
<template>
  <div class="sprint-card" :id="item.uuid" :style="{ borderColor: item.color }">
    {{ item.name }}
    <AddUser />
  </div>
</template>

<style lang="scss" scoped>
  .sprint-card {
    border: 2px solid white;
  }
</style>
