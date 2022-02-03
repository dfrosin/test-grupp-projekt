<template>
  <input
    type="button"
    :value="$store.state.counter"
    @click="$store.commit('increment')"
  />
</template>
