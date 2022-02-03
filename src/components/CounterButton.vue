<script></script>
<template>
  <input
    type="button"
    :value="$store.state.counter"
    @click="$store.commit('increment')"
  />
  <p>Erikas ändring</p>
</template>
