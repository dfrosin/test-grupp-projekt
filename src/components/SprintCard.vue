<script>
  export default {
    props: {
      title: {
        type: String,
        default: '',
        required: true
      }
    },
    data() {
      return {}
    }
  }
</script>
<template>
  <div class="sprint-card">
    {{ item.card }}
  </div>
</template>

<style lang="scss" scoped></style>
