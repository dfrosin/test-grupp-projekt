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
      this.splitArrayWithUsers()
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
        showPBIName: false,
        showHide: 'Show PBI',
        taskName: '',
        PBIIsAssigned: '',
        borderColor: this.item.color,
        taskColor: '',
        showUsers: false,
        error: false
      }
    },
    methods: {
      getUsers() {
        this.error = !this.error
        this.showUsers === true
        this.add = !this.add
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
        if (
          //Adams kod, verkligen Adams kod
          confirm(`Do you really want to delete: ${name.target.id}?`)
          //Slut Adams kod
        ) {
          await deleteDoc(
            doc(firestore, this.$store.state.projectName, name.target.id)
          )
        }
        this.$emit('update-docs-in-parent')
        //lägg till en emit som skickas upp till parent och kör GetDatabase Funktionen.
      },
      usersInProject(e) {
        //Hittar presonen du klickar på och lägger till den först i ett object,
        //med en array i för att kunna skicka upp det till Firebase
        this.taskName = e.target.id
        let copiedObject = JSON.parse(JSON.stringify(e.target.textContent))
        this.userObject.owner.push(copiedObject)
        this.add = false
        this.updateFirebase()
        this.$emit('update-docs-in-parent')
      },
      updateFirebase() {
        const whereToAddData = doc(
          firestore,
          `${this.$store.state.projectName}/${this.taskName}`
        )

        const updateData = {
          taskOwner: this.userObject
        }
        updateDoc(whereToAddData, updateData)
      },
      removeUser(user) {
        this.taskName = user.target.id
        //Tar bort användare från arrayen. Stänger även divven
        const taskIndex = this.userObject.owner.indexOf(
          user.target.parentNode.firstChild.textContent
        )
        this.userObject.owner.splice(taskIndex, 1)

        this.editInfo = false
        this.updateFirebase()
        this.$emit('update-docs-in-parent')
      },
      editMenu(e) {
        this.PBIIsAssigned = e.target.id
        if (this.PBIIsAssigned === 'Not assigned') {
          this.showHide = 'Assing to PBI'
          this.edit = !this.edit
        } else this.edit = !this.edit
      },
      editMode() {
        this.editInfo = !this.editInfo
        this.edit = false
      },
      showPBI() {
        this.showPBIName = !this.showPBIName
        if (this.showPBIName === true) {
          this.showHide = 'Hide PBI'
        } else {
          this.showHide = 'Show PBI'
        }
        this.edit = false
      },
      splitArrayWithUsers() {
        if (this.item.taskOwner !== undefined) {
          this.item.taskOwner.owner.forEach((owner) => {
            this.userObject.owner.push(owner)
          })
        } else {
          return
        }
      },
      assignPBI(e) {
        this.selectedPBI = e.target.textContent
        this.taskName = e.target.id
        this.taskColor = e.target.attributes[1].textContent

        const whereToAddData = doc(
          firestore,
          `${this.$store.state.projectName}/${this.taskName}`
        )

        const updateData = {
          PBI: this.selectedPBI,
          color: this.taskColor
        }
        updateDoc(whereToAddData, updateData)
        this.$emit('update-docs-in-parent')
      }
    },
    emits: ['update-docs-in-parent']
  }
</script>
<template>
  <div
    class="sprint-card"
    :id="item.uuid"
    :style="{ borderColor: this.borderColor }"
  >
    <p class="edit-dots" @click="editMenu" :id="item.PBI">...</p>
    <div class="edit-menu" v-if="edit">
      <p @click="editMode">Edit</p>
      <p @click="showPBI">{{ this.showHide }}</p>
      <p class="delete" @click="deleteTask" :id="item.name">Delete</p>
    </div>
    <div class="PBI-div" v-if="showPBIName">
      <p v-if="this.PBIIsAssigned !== 'Not assigned'">{{ item.PBI }}</p>
      <select class="select-PBI" v-if="this.PBIIsAssigned === 'Not assigned'">
        <option>Select PBI</option>
        <option
          v-for="objects in $store.state.arrayOfObjects"
          :id="item.id"
          :color="objects.color"
          :key="objects.id"
          @click="assignPBI"
        >
          {{ objects.id }}
        </option>
      </select>
    </div>
    <p class="task-name">
      {{ item.name }}
    </p>
    <section class="select-user">
      <p class="time-stamp">
        {{ item.time }}
      </p>
      <!-- <div v-if="error" class="error-message">
        <p v-if="!userArray[0].personInProject">
          You need to invite colleagues to the project first
        </p>
      </div> -->
      <div class="card-owners" v-if="userObject.owner">
        <p class="taskowner">Task owner:</p>
        <div v-for="owners in userObject.owner" :key="owners.id">
          <p>{{ owners }}</p>
          <img
            v-if="editInfo"
            src="assets/trash-can.png"
            @click="removeUser"
            :id="item.id"
          />
        </div>
      </div>
      <div class="add-user">
        <img class="get-user" src="/assets/add.png" @click="getUsers" />
      </div>
      <div class="users-list" v-if="add">
        <ul class="card-list-style" v-if="this.userArray.length >= 1">
          <li class="h3"><h3>Select task owner:</h3></li>
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
  .select-PBI {
    margin-top: 10px;
    background-color: #fff;
    padding: 5px;
  }
  .PBI-div {
    border-bottom: 1px solid rgba(0, 0, 0, 0.144);
    p {
      margin-top: 1.9rem;
      font-weight: 800;
    }
  }
  .edit-dots {
    font-weight: 900;
    position: absolute;
    top: 1px;
    right: 10px;
    cursor: pointer;
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
    z-index: 100;

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
    justify-content: center;
    flex-wrap: wrap;
    div {
      display: flex;
    }
    p {
      cursor: pointer;
      margin: 3px;
    }
    img {
      width: 12px;
      height: 12px;
      align-self: center;
      cursor: pointer;
    }
  }
  .taskowner {
    font-size: 1.3rem;
    display: block;
    width: 100%;
    text-align: center;
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
    .h3:hover {
      text-decoration: none;
      color: black;
      cursor: default;
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
    h3 {
      font-size: 1.2rem;
    }
    li {
      font-size: 1.3rem;
    }
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
