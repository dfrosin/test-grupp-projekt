<template>
  <div class="card card-body mt-4">
    <form @submit.prevent="skapaUser">
      <div class="form-group">
        <label>Name</label>
        <input
          placeholder="Namn"
          v-model="userName"
          class="form-control"
          required
        />
      </div>

      <div class="form-group mt-3">
        <label>Email</label>
        <input
          placeholder="Email"
          v-model="email"
          class="form-control"
          type="email"
          required
        />
      </div>

      <button type="submit" class="btn btn-success mt-3">Create User</button>
    </form>
  </div>
</template>

<script>
  import { createUser } from '../firebase'
  // import { reactive } from 'vue'

  export default {
    data() {
      return {
        userName: '',
        email: '',
        form: { name: '', email: '' }
      }
    },
    methods: {
      skapaUser() {
        this.form.name = this.userName
        this.form.email = this.email
        createUser(this.form)
      }
    }
  }
  // setup() {
  //   const form = reactive({ name: '', email: '' })

  //   const onSubmit = async () => {
  //     await createUser({ ...form })
  //     form.name = ''
  //     form.email = ''
  //   }

  //   return { form, onSubmit }
  // }
</script>
<style scoped>
  .form-control {
    color: black;
  }
</style>
