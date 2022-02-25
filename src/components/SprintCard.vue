<script>
  import { firestore } from '../firebase.js'
  import {
    deleteDoc,
    doc,
    where,
    collection,
    query,
    limit,
    getDocs
  } from 'firebase/firestore'
  export default {
    props: {
      item: {
        type: [String, Object, Number, Array],
        default: ''
      },
      date: {
        type: [String, Number],
        default: ''
      },
      board: {
        type: [String, Number],
        default: ''
      },

      name: {
        type: [String],
        default: ''
      }
    },
    created() {
      this.getUsers()
    },
    data() {
      return {
        user: '',
        userArray: [],
        add: false,
        selectedUser: null
      }
    },
    methods: {
      addUser() {
        this.add = !this.add
      },
      getUser(selectedUser) {
        this.user = selectedUser.target.firstChild.data
      },
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
      async deleteTask(board, name) {
        if (confirm(`Är du säker på att du vill radera task: ${name}`)) {
          console.log(' Delete task:', board, name)
          await deleteDoc(doc(firestore, board, name))
        }
      }
    }
  }
</script>
<template>
  <div class="sprint-card" :id="item.uuid" :style="{ borderColor: item.color }">
    <img
      class="trashImg"
      src="/assets/edit.png"
      alt=""
      @click="deleteTask(board, name)"
    />
    <p class="task-name">
      {{ item.name }}
    </p>
    <p v-if="user">
      {{ user }}
    </p>
    <section class="select-user">
      <p class="time-stamp">
        {{ item.time }}
      </p>
      <div class="add-user">
        <p>Add user</p>
        <img class="get-user" src="/assets/add.png" @click="addUser" />
      </div>
      <div class="users-list" v-if="this.userArray.length >= 1">
        <ul class="card-list-style" v-if="add">
          <li @click="getUser" v-for="kebab in this.userArray" :key="kebab.id">
            {{ kebab.userName }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .sprint-card {
    border: 2px solid white;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .trashImg {
    // display: flex;
    width: 15px;
    height: 15px;
    cursor: pointer;
    // align-self: flex-end;
    margin-right: 3px;
    margin-bottom: 3px;
    position: absolute;
    top: 3px;
    right: 10px;
  }

  .add-user {
    display: flex;
    justify-content: flex-end;
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
    // margin-right: 1.8rem;

    select {
      border-radius: 10px;
      // padding: 0.3rem;
    }
  }

  .select-user {
    border-top: 1px solid rgba(0, 0, 0, 0.144);
    padding: 2px 2px;
  }

  .get-user {
    margin-right: 8px;
  }

  .time-stamp {
    font-size: 1.2rem;
  }

  .card-list-style {
    position: absolute;
    border: solid black 1px;
    border-radius: 10px;
    list-style: none;
    background-color: white;
    padding: 10px;
    z-index: 1;
  }

  .task-name {
    margin-top: 2.5rem;
  }
</style>
