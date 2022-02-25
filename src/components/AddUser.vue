<!-- <template>
  <section class="select-user">
    <div class="add-user">
      <p>Add user</p>
      <img src="/assets/add.png" @click="addUser" />
    </div>
    <div class="users-list" v-if="this.userArray.length >= 1">
      <select @change="selectUser" v-if="add" v-model="selectedUser">
        <option v-for="user in this.userArray" :key="user.id">
          {{ user.userName }}
        </option>
      </select>
    </div>
  </section>
</template>
<script>
  import { firestore } from '../firebase'
  import { where, collection, query, limit, getDocs } from 'firebase/firestore'
  export default {
    created() {
      this.getUsers()
    },
    data() {
      return {
        userArray: [],
        add: false,
        selectedUser: null
      }
    },
    emits: ['send-user', 'this.selectedUser'],
    methods: {
      getUsers() {
        const customerOrdersQuery = query(
          collection(firestore, 'users'),
          where('user', '==', 'user'),
          limit(50)
        )

        getDocs(customerOrdersQuery).then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.userArray.push({ ...doc.data(), id: doc.id })
          })
        })
      },
      addUser() {
        this.add = true
      },
      selectUser() {
        //skicka prop till mamma
        console.log(this.selectedUser)
        this.$emit('send-user', this.selectedUser)
        this.add = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .add-user {
    display: flex;
    justify-content: flex-end;
    margin-right: 1.8rem;
    img {
      margin-left: 1rem;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    p {
      margin: 0;
    }
  }
  .users-list {
    display: flex;
    justify-content: flex-end;
    margin-right: 1.8rem;

    select {
      border-radius: 10px;
      padding: 0.3rem;
    }
  }
</style> -->
