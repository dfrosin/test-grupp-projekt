<script>
  import { reactive, computed, onMounted } from 'vue'
  import { getUser, updateUser } from '../firebase'
  import route from '../router'
  import router from '../router'

  export default {
    setup() {
      const form = reactive({ name: '', email: '' })
      onMounted(async () => {
        const user = await getUser(userId.value)
        form.name = user.name
        form.email = user.email
      })

      const userId = computed(() => route.params.id)
      const update = async () => {
        await updateUser(userId.value, { ...form })
        router.push('/')
        form.name = ''
        form.email = ''
      }

      return { form, update }
    }
  }
</script>
<template>
  <div class="card card-body mt-4">
    <h3>Edit Users</h3>
    <form @submit.prevent="update">
      <div class="form-group">
        <label>Name</label>
        <input v-model="form.name" class="form-control" required />
      </div>
      <div class="form-group mt-3">
        <label>Email</label>
        <input
          v-model="form.email"
          class="form-control"
          type="email"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary mt-3">Update</button>
    </form>
  </div>
</template>
