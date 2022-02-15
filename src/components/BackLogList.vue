<template>
  <li v-for="items in array" :key="items.idex">
    {{ items.id }}
    <img src="/assets/trash-can.png" @click="deleteItem" />
  </li>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      deleteItem(e) {
        this.deleted = true
        let deleteItemId = e.target.id
        var filtered = this.array.filter(function (el) {
          return el.id != deleteItemId
        })
        this.arrayjsjs = filtered
        console.log(filtered)
      }
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
    background-color: rgba(255, 255, 255, 0.76);
    color: black;
    padding: 10px;
    margin-top: 10px;
    width: 80%;
    min-height: 3rem;
    border-radius: 10px;
    font-size: 1.3rem;
    img {
      width: 15px;
      height: 15px;
      cursor: pointer;
      margin: 2px;
    }
  }
</style>
