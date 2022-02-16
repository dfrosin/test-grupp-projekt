<template>
  <form id="color" @submit.prevent="addColor">
    <label for="color">Choose a color:</label>
    <input type="color" name="color" v-model="color" />
    <button @click="addColor" type="submit" class="btn btn-success mt-3">
      Create account
    </button>
  </form>
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
        this.$emit('getColor', this.color)
        updateDoc(whereToAddData, updateData)
      }
    }
  }
</script>

<style lang="scss" scoped>
  form {
    display: flex;
    flex-direction: column;
    width: 100px;
  }

  p,
  label {
    font-size: 1.6rem;
    font-weight: bold;
    margin-top: 4.2rem;
    text-align: center;
  }

  input {
    margin: 0.4rem;
    height: 2rem;
    width: 85%;
  }
</style>
