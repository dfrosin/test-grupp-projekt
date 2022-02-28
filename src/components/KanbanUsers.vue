<script>
  import { firestore } from '../firebase.js'
  import {
    where,
    collection,
    query,
    limit,
    getDocs,
    doc,
    setDoc
  } from 'firebase/firestore'
  export default {
    data() {
      return {
        projectUsers: [],
        selectedUsers: [],
        copyOfUser: {
          personInProject: [],
          user: 'user'
        },
        userName: '',
        clicked: false,
        showMaker: false
      }
    },
    created() {
      this.getUsers()
    },
    methods: {
      getUsers() {
        const customerOrdersQuery = query(
          collection(firestore, 'users'),
          where('user', '==', 'user'),
          limit(50)
        )

        getDocs(customerOrdersQuery).then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.projectUsers.push({ ...doc.data(), id: doc.id })
          })
        })
      },
      usersInProject() {
        // this.copyOfUser.personInProject = this.userName
        let copiedObject = JSON.parse(JSON.stringify(this.userName))
        this.copyOfUser.personInProject.push(copiedObject)
        // console.log(this.copyOfUser)
        // this.copyOfUser = null
      },
      removeUser(user) {
        if (confirm(`Do want to remove this user? ${user.target.id}`)) {
          const taskIndex = this.copyOfUser.personInProject.indexOf(user)
          this.copyOfUser.personInProject.splice(taskIndex, 1)
        }
      },
      postUsers() {
        this.$store.commit('setArrayOfUsers', this.copyOfUser)
        const whereToAddData = doc(
          firestore,
          `${this.$store.state.projectName}/projectUsers`
        )
        setDoc(whereToAddData, this.copyOfUser)
      },
      showUsers() {
        this.clicked = !this.clicked
      },
      showMakerClick() {
        this.showMaker = !this.showMaker
      }
    }
  }
</script>
<template>
  <div class="margarin">
    <section v-if="this.$store.state.projectName != null" class="main-content">
      <h3 class="h3styling">
        Invite users to {{ this.$store.state.projectName
        }}<span @click="showMakerClick" class="cursor">+</span>
      </h3>

      <section v-if="showMaker" class="mother-flex">
        <select
          @change="usersInProject"
          v-model="userName"
          class="ett-klassnamn"
        >
          <option
            v-for="user in this.projectUsers"
            :key="user.id"
            class="width-control"
          >
            {{ user.userName }}
          </option>
        </select>

        <section class="userList">
          <div
            v-for="select in copyOfUser.personInProject"
            :key="select.name"
            class="names"
          >
            {{ select }}
            <img
              src="/assets/close.png"
              alt="Ett gött kors"
              class="yo"
              @click="removeUser"
              :id="select.personInProject"
            />
          </div>
        </section>
        <input
          type="button"
          @click="postUsers"
          value="Invite Users"
          class="btn-own-walla"
        />
      </section>
    </section>
  </div>
</template>

<style scoped>
  .main-content {
    grid-column: 2;
    justify-content: flex-end;
  }
  .mother-flex {
    display: flex;
    flex-direction: column;
  }
  .btn-own-walla {
    width: 15%;
    padding: 1rem;
    height: 30px;
    margin-left: 15px;
    background-color: red;
    border-radius: 7px;
  }
  .userList {
    display: flex;
    flex-wrap: wrap;
  }
  .names {
    background-color: #fff;
    border: 1px solid black;
    border-radius: 4px;
    margin: 0.4rem;
    padding: 0.4rem;
    font-weight: bolder;
    /* margin-top: 7%; */
  }
  .yo {
    width: 8px;
    cursor: pointer;
  }
  .h3styling {
    display: flex;
    width: 100%;
    color: #fff;
    align-items: center;
  }
  .margarin {
    display: grid;
    grid-template-columns: 55% 45%;
  }
  .cursor {
    display: flex;
    margin-left: 10px;
    font-size: 30px;
    cursor: pointer;
    color: black;
    background-color: #fff;
    height: 30px;
    width: 30px;
    border-radius: 100%;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
  }
  .ett-klassnamn {
    /* position: absolute; */
    margin-right: 24%;
    font-size: 1.2rem;
    padding: 1rem;
    border-radius: 10px;
    width: 30%;
  }
</style>
