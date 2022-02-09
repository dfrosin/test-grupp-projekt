<template>
  <div id="container">
    <form @submit.prevent="onSubmit">
      <div class="inputs">
        <label>Username</label>
        <input placeholder="Name" v-model="userName" class="form-control" />
      </div>
      <div class="inputs">
        <label>Email</label>
        <input placeholder="Email" v-model="email" class="form-control" />
      </div>
    </form>
    <button type="submit" class="btn btn-success mt-3">Log In</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userName: '',
        email: ''
      }
    },
    methods: {
      onsubmit() {
        console.log('Här kommer det hända massa roliga programmatiska saker!')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    button {
      width: 10%;
      margin: 0 45%;
    }
  }
  .inputs {
    display: flex;
    flex-direction: column;
    input {
      width: 30%;
      margin: 1rem 35%;
    }
  }
  form {
    label {
      margin-left: 35%;
      color: black;
    }
  }
</style>
