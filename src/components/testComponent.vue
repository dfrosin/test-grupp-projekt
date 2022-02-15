<script setup>
  import { ref } from 'vue'

  let count = ref(1)
</script>

<template>
  <div class="testContainer">
    <h1>{{ count }}</h1>
    <button @click="count++">press me</button>
  </div>
</template>

<style>
  .testContianer {
    width: 100%;
    border: solid black 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
