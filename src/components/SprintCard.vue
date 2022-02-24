<script>
  import AddUser from './AddUser.vue'
  export default {
    props: {
      item: {
        type: [String, Object, Number, Array],
        default: ''
      },
      date: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      return {
        user: ''
      }
    },
    methods: {
      getUser(selectedUser) {
        this.user = selectedUser
      }
    },
    components: { AddUser }
  }
</script>
<template>
  <div class="sprint-card" :id="item.uuid" :style="{ borderColor: item.color }">
    <p>
      {{ item.name }}
    </p>
    <p>
      {{ item.time }}
    </p>
    <p v-if="user">
      {{ user }}
    </p>
    <AddUser @send-user="getUser" />
  </div>
</template>

<style lang="scss" scoped>
  .sprint-card {
    border: 2px solid white;
  }
</style>
