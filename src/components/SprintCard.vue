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
  <div class="sprint-card">
    {{ item.value }}
  </div>
</template>

<style lang="scss" scoped></style>
