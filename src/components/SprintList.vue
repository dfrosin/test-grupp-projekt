<template>
  <div class="sprint-list">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <slot />
  </div>
</template>

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

<style></style>
