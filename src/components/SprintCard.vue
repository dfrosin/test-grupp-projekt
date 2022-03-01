<script>
  import { firestore } from '../firebase.js'
  import {
    deleteDoc,
    doc,
    where,
    collection,
    query,
    limit,
    getDocs,
    updateDoc
    // updateDoc
  } from 'firebase/firestore'
  export default {
    created() {
      this.item.taskOwner.owner.forEach((owner) => {
        this.userObject.owner.push(owner)
      })
    },
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
    data() {
      return {
        user: '',
        userArray: [],
        add: false,
        ownerArray: [],
        userObject: {
          owner: []
        },
        edit: false,
        editInfo: false,
        noOneInvited: false
      }
    },
    methods: {
      getUsers() {
        console.log(this.userObject.owner.length)
        if (this.$store.state.noOneInvited === true) {
          this.noOneInvited = true
          return
        }
        //this.add öppnar och stänger listan med användare
        else this.add = !this.add
        //Körs när du trycker på plusstecknet
        const customerOrdersQuery = query(
          collection(firestore, `${this.$store.state.projectName}`),
          where('user', '==', 'user'),
          limit(50)
        )

        getDocs(customerOrdersQuery).then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.userArray.push({ ...doc.data(), id: doc.id })
          })
        })
      },
      async deleteTask(name) {
        //funkar inte!!
        console.log(' Deleted task:', name.target.id)
        console.log(`${this.$store.state.projectName},${name.target.id}`)
        if (
          //Adams kod
          confirm(`Are you sure you really want delete: ${name.target.id}?`)
          //Slut Adams kod
        ) {
          await deleteDoc(
            doc(
              firestore,
              `${this.$store.state.projectName},${name.target.id} `
            )
          )
        }
      },
      usersInProject(e) {
        //Hittar presonen du klickar på och lägger till den först i ett object,
        //med en array i för att kunna skicka upp det till Firebase
        const taskName = e.target.id
        let copiedObject = JSON.parse(JSON.stringify(e.target.textContent))
        this.userObject.owner.push(copiedObject)
        this.add = false

        const whereToAddData = doc(
          firestore,
          `${this.$store.state.projectName}/${taskName}`
        )

        const updateData = {
          taskOwner: this.userObject
        }
        updateDoc(whereToAddData, updateData)
      },
      removeUser(user) {
        //Tar bort användare från arrayen. Stänger även divven
        const taskIndex = this.userObject.owner.indexOf(
          user.target.parentNode.firstChild.textContent
        )
        this.userObject.owner.splice(taskIndex, 1)
        this.editInfo = false
      },
      editMenu() {
        this.edit = !this.edit
      },
      editMode() {
        this.editInfo = true
        this.edit = false
      }
    },
    emits: []
  }
</script>
<template>
  <div class="sprint-card" :id="item.uuid" :style="{ borderColor: item.color }">
    <img class="trashImg" src="/assets/edit.png" alt="" @click="editMenu" />
    <div class="edit-menu" v-if="edit">
      <p @click="editMode">Edit</p>
      <p class="delete" @click="deleteTask" :id="item.name">Delete</p>
    </div>
    <p class="task-name">
      {{ item.name }}
    </p>
    <section class="select-user">
      <p class="time-stamp">
        {{ item.time }}
      </p>
      <div
        v-if="this.$store.state.noOneInvited && this.noOneInvited == true"
        class="error-message"
      >
        <p>You need to invite colleagues to the project first</p>
      </div>
      <div class="card-owners" v-if="this.userObject.owner.length >= 1">
        <div
          @click="removeUser"
          v-for="owners in this.userObject.owner"
          :key="owners.id"
        >
          <p>{{ owners }}</p>
          <p v-if="editInfo">X</p>
        </div>
      </div>
      <div class="add-user">
        <img class="get-user" src="/assets/add.png" @click="getUsers" />
      </div>
      <div class="users-list" v-if="add">
        <ul class="card-list-style" v-if="this.userArray.length >= 1">
          <li><h3>Select task owner:</h3></li>
          <li
            v-for="kebab in this.userArray[0].personInProject"
            :key="kebab.id"
            @click="usersInProject"
            :id="item.name"
          >
            {{ kebab }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .names-in-project {
    display: flex;
    justify-content: space-between;
    p {
      font-size: 12px;
    }
  }
  .error-message {
    color: red;
    font-size: 12px;
  }
  .edit-menu {
    border: 1px solid black;
    border-radius: 7px;
    position: absolute;
    top: 2rem;
    right: -1rem;
    background-color: white;
    padding: 10px;

    p:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
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

  .card-owners {
    display: flex;
    justify-content: flex-end;
    p {
      margin: 3px;
      cursor: pointer;
    }
  }
  .closeImg {
    margin-right: 1rem;
    width: 8px;
    height: 10px;
    cursor: pointer;
  }
  .users-list {
    display: flex;
    justify-content: flex-end;
    // margin-right: 1.8rem;
    cursor: pointer;
    li:hover {
      color: aqua;
      text-decoration: underline;
    }

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
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .task-name::-webkit-scrollbar {
    display: none;
  }
  .delete {
    color: red;
  }
</style>
