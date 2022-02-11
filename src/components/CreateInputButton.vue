<!-- skapa kort, knapp som klickas på så kommer ett textfält upp där man skapar task -->

<script>
  export default {
    data() {
      return {
        isTrue: false
      }
    },
    methods: {
      createInput() {
        this.isTrue = true
      }
    }
  }
</script>

<template>
  <div>
    <button @click="createInput" type="submit" class="btn btn-success mt-3">
      Create task
    </button>
    <input v-if="isTrue === !false" type="text" />
  </div>
</template>

<style lang="scss" scoped>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
  }
</style>
