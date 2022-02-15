<template>
  <form id="color" @submit.prevent="addColor">
    <label for="color">Select a color:</label>
    <input type="color" name="id" v-model="color" />
  </form>

  <button @click="addColor" type="submit" class="btn btn-success mt-3">
    Select a color
  </button>
</template>

<script>
  import { firestore } from '../firebase'
  import { updateDoc, doc } from 'firebase/firestore'

  export default {
    data() {
      return {
        color: this.color
      }
    },
    methods: {
      addColor() {
        const whereToAddData = doc(firestore, 'PBI/Adam') //object.id ist för Adam//
        const updateData = {
          color: this.color
        }
        updateDoc(whereToAddData, updateData)
      }
    }
  }
</script>

<style lang="scss" scoped>
  p,
  label {
    font-size: 1.6rem;
    font-weight: bold;
  }

  input {
    margin-top: 4.2rem;
  }
</style>
