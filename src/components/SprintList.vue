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
    props: ['title'],
    data() {
      return {}
    }
  }
</script>

<style></style>
