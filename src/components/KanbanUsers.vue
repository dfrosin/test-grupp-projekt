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
          class="btn btn-secondary mt-3"
        />
      </section>
    </section>
  </div>
</template>

<style scoped>
  .main-content {
    display: flex;
    justify-content: flex-end;
  }
  .mother-flex {
    display: flex;
    flex-direction: column;
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
    margin-right: 24%;
    font-size: 1.2rem;
    padding: 0.8rem;
    border-radius: 10px;
    width: 18rem;
  }
</style>
