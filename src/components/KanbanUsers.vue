<script>
  import { firestore } from '../firebase.js'
  import {
    where,
    collection,
    query,
    limit,
    getDocs,
    doc,
    updateDoc
  } from 'firebase/firestore'
  export default {
    data() {
      return {
        projectUsers: [],
        selectedUsers: [],
        copyOfUser: {
          personInProject: []
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
        //Hämtar ut alla användare när sidan laddas lägger den i projectUsers arrayen.
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
        //Körs varje gång du klickar på ett namn i listan och lägger till den i arrayen:
        //copoOfUser
        let copiedObject = JSON.parse(JSON.stringify(this.userName))
        this.copyOfUser.personInProject.push(copiedObject)
      },
      removeUser(user) {
        //Tar bort en användare när du klickar på krysset.
        if (confirm(`Do want to remove this user? ${user.target.id}`)) {
          const taskIndex = this.copyOfUser.personInProject.indexOf(user)
          this.copyOfUser.personInProject.splice(taskIndex, 1)
        }
      },
      postUsers() {
        //Körs när man trycker på "Invite Users", döljer även "mother-flex"
        //med showmaker = false
        this.$store.commit('setArrayOfUsers', this.copyOfUser)
        const whereToAddData = doc(
          firestore,
          `${this.$store.state.projectName}/projectUsers`
        )
        updateDoc(whereToAddData, this.copyOfUser)
        this.showMaker = false
        this.$store.commit('switchBetweenStatus', false)
      },
      showMakerClick() {
        //Körs när man trycker på pluss tecknet och skall visa/dölja listan med
        //användare
        this.showMaker = !this.showMaker
      }
    }
  }
</script>
<template>
  <div class="margarin">
    <h3 v-if="this.$store.state.projectName != null" class="h3styling">
      Invite users to {{ this.$store.state.projectName
      }}<button
        @click="showMakerClick"
        type="submit"
        class="btn btn-secondary mt-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus-circle"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
          />
        </svg>
      </button>
    </h3>
    <section v-if="this.$store.state.projectName != null" class="main-content">
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
          class="btn btn-secondary mt-3"
        />
      </section>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .main-content {
    display: flex;
    justify-content: flex-end;
  }
  .mother-flex {
    display: flex;
    flex-direction: column;
  }
  input {
    width: 100px;
    align-self: flex-end;
  }
  /* .btn-own-walla {
    width: 45%;
    padding: 1rem;
    height: 30px;
    margin-left: 15px;
    background-color: red;
    border-radius: 7px;
  } */
  .userList {
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    align-self: flex-end;
  }
  .names {
    background-color: rgba(235, 235, 235, 0.3);
    border-radius: 4px;
    margin: 0.4rem;
    padding: 0.4rem;
    font-weight: bolder;
    color: #fff;
  }
  .yo {
    width: 8px;
    cursor: pointer;
  }
  .h3styling {
    display: flex;
    justify-content: flex-end;
    width: 40%;
    color: #fff;
  }
  .margarin {
    margin-right: 10%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
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
    margin-left: auto;
    font-size: 1.2rem;
    padding: 0.8rem;
    border-radius: 10px;
    width: 18rem;
  }
</style>
