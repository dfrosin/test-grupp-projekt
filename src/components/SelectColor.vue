<template>
  <form id="color" @submit.prevent="addColor">
    <label for="color">Select a color:</label>
    <input type="color" name="color" v-model="color" @onchange="addColor" />
  </form>
</template>

<script>
  // import { firestore } from '../firebase'
  // import { updateDoc, doc } from 'firebase/firestore'

  export default {
    emits: ['getColor'],
    data() {
      return {
        color: this.color
      }
    },
    methods: {
      addColor() {
        // const whereToAddData = doc(firestore, 'PBI/Adam') //object.id ist för Adam//
        // const updateData = {
        //   color: this.color
        this.$emit('getColor', this.color)
        // updateDoc(whereToAddData, updateData)
      }
    }
  }
</script>
<style lang="scss" scoped>
  #color {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-center;

    p,
    label {
      font-size: 1.6rem;
      font-weight: bold;
      margin-top: 4.2rem;
    }

    button {
      margin-bottom: 1rem;
    }
    input {
      margin: 0.4rem;
      height: 2rem;
      width: 20%;
    }
  }
</style>
