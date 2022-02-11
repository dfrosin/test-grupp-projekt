<template>
  <li v-for="items in array" :key="items.id">
    {{ items }}
    <img src="/assets/trash-can.png" />
  </li>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      array: {
        type: Array,
        Object,
        default: null
      }
    }
  }
</script>

<style lang="scss" scoped>
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    background-color: #ffff;
    color: black;
    padding: 3px;
    margin-top: 10px;
    width: 30rem;
    height: 3rem;
    border-radius: 10px;
    font-size: 1.8rem;
    img {
      width: 15px;
      height: 15px;
    }
  }
</style>
