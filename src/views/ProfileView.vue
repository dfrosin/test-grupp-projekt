<!--
  1.Skapa en overview för profil med namn, profilbild, kontaktuppgifter osv.
  2.Skapa möjligheten att ändra namn och kontaktuppgifter med inputfält.
  3.Skapa en overview med vilka tasks man har och hur långt det är
  kvar på sprinten.

-->

<script>
  import ChartComponent from '../components/ChartComponent.vue'
  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
  } from 'firebase/storage'
  import { firestore } from '../firebase'
  import {
    doc,
    setDoc,
    where,
    limit,
    getDocs,
    query,
    getDoc,
    collection
  } from 'firebase/firestore'

  const storage = getStorage()

  export default {
    data() {
      return {
        editing: false,
        uploading: false,
        newPhoto: null,
        url: null,
        file: null,
        fullnameCopy: '',
        userNameCopy: '',
        userCollection: {},
        arrayOfProjectNames: [],
        projectInfo: '',
        arrayOfTasks: [],
        anotherArray: [],
        allInfoUser: [],

        //Innehåller alla tasks(object) från projektet uppdelat i alla statusar
        pieChartArray: [],
        personalPieChartArray: [],

        // Ska innehålla nummer med hur många kort användaren har i varje status
        personalTaskString: '',

        //Här sparas alla status i det valda projektet som strängvärden
        statusArray: [],
        chartNumber: '',
        allInfoCopy: [],
        chartReload: true,
        numberFucker: ''
      }
    },
    created() {
      setTimeout(() => {
        if (this.$store.state.loggedInUser === null) {
          this.$router.push('/login')
        } else {
          this.userCollection = { ...this.$store.state.loggedInUser }
          console.log(this.$store.state.loggedInUser)
          this.url = this.$store.state.loggedInUser.profilePicture
        }
        this.getAllProjectNames()
      }, 400)
    },
    components: {
      ChartComponent
    },
    methods: {
      onEdit() {
        this.editing = true
        this.fullnameCopy = this.userCollection.fullName.slice()
        this.userNameCopy = this.userCollection.userName.slice()
      },
      onCancel() {
        this.userCollection.fullName = this.fullnameCopy
        this.userCollection.userName = this.userNameCopy
        this.editing = false
        this.uploading = false
        this.newPhoto = null
      },
      onSave() {
        this.editing = false
        const whereToAddData = doc(
          firestore,
          `users/${this.userCollection.userId}`
        )
        setDoc(whereToAddData, this.userCollection)
        this.$store.commit('setLoggedInUser', this.userCollection)
        this.userCollection = { ...this.$store.state.loggedInUser }
      },
      previewPhoto(photo) {
        this.file = photo.target.files[0]
        this.uploading = true
        const imageFile = photo.target.files[0]
        this.newPhoto = URL.createObjectURL(imageFile)
      },
      savePhoto() {
        this.url = this.newPhoto
        this.uploading = false
        this.newPhoto = null
        console.log(this.file)
        const storageRef = ref(
          storage,
          `${this.$store.state.loggedInUser.userName}`
        )
        uploadBytes(storageRef, this.file).then(() => {
          console.log('Uploaded a picture')
          getDownloadURL(
            ref(storage, `${this.$store.state.loggedInUser.userName}`)
          ).then((url) => {
            this.url = url
            this.userCollection.profilePicture = this.url
            console.log(this.url)
          })
        })
      },
      filterSearch() {
        this.allInfoUser = []
        this.anotherArray.forEach((e) => {
          if (e.taskOwner) {
            if (
              e.taskOwner.owner.includes(
                this.$store.state.loggedInUser.userName
              )
            ) {
              //här hamnar alla kort som man är owner till
              this.allInfoUser.push(e)
            }
          }
        })
      },
      loopForAll() {
        this.chartNumber = ''
        this.statusArray = []
        this.pieChartArray
        for (let n = 0; n < this.projectInfo.status.length; n++) {
          // statusnamn utifrån array
          let statusTitle = this.projectInfo.status[n]
          let tasks = this.anotherArray.filter((el) => {
            return el.status === statusTitle
          })
          let dynamicObject = {
            title: statusTitle,
            cards: tasks
          }
          this.statusArray.push(statusTitle)
          this.pieChartArray.push(dynamicObject)
          this.chartNumber = this.chartNumber + dynamicObject.cards.length
        }
      },
      loopForMe() {
        this.personalTaskString = ''
        for (let n = 0; n < this.projectInfo.status.length; n++) {
          let statusTitle = this.projectInfo.status[n]
          let tasks = this.allInfoCopy.filter((el) => {
            return el.status === statusTitle
          })
          let dynamicObject = { title: statusTitle, cards: tasks }
          this.personalTaskString =
            this.personalTaskString + dynamicObject.cards.length
          this.personalPieChartArray.push(dynamicObject)
        }
        this.chartReload = false
      },

      getDatabase() {
        this.chartReload = true
        const customerOrdersQuery = query(
          collection(firestore, `${this.projectName}`),
          where('tasks', '==', 'tasks'),
          limit(50)
        )

        getDocs(customerOrdersQuery).then((snapshot) => {
          this.anotherArray = []
          let tasks = []
          snapshot.docs.forEach((doc) => {
            tasks.push({ ...doc.data(), id: doc.id })
          })
          this.arrayOfTasks = tasks
          this.anotherArray = JSON.parse(JSON.stringify(this.arrayOfTasks))
          this.filterSearch()
          this.allInfoCopy = JSON.parse(JSON.stringify(this.allInfoUser))
          this.loopForAll()
          this.loopForMe()
        })
      },
      async selectProjectName(evt) {
        this.projectName = evt.target.value
        this.$store.commit('setProjectName', this.projectName)
        this.select = true
        const projectDoc = doc(firestore, `projects/${this.projectName}`)
        const projectSnapshot = await getDoc(projectDoc)
        this.projectInfo = projectSnapshot.data()
        this.getDatabase()
      },
      getAllProjectNames() {
        const allProjectNames = query(
          collection(firestore, 'projects'),
          where('project', '==', 'project'),
          limit(50)
        )
        getDocs(allProjectNames).then((snapshot) => {
          let projectNames = []
          snapshot.docs.forEach((doc) => {
            projectNames.push({ ...doc.data(), id: doc.id })
          })
          this.arrayOfProjectNames = projectNames
        })
      }
    }
  }
</script>
<template>
  <div class="profile-card">
    <h1>My Profile</h1>
    <div class="information-container">
      <div class="img-container">
        <img v-if="uploading === false" :src="url" alt="profile picture" />
        <img
          v-if="uploading === true"
          :src="newPhoto"
          alt="new profile picture"
        />
        <div class="upload-buttons" v-if="editing === true">
          <input
            class="edit-button"
            type="file"
            @change="previewPhoto"
            accept="image/png, image/jpeg"
          />
          <button
            v-if="this.newPhoto !== null"
            @click="savePhoto"
            type="submit"
          >
            save
          </button>
        </div>
      </div>
      <div class="card-body">
        <div v-if="editing === false" class="saved-information">
          <p>{{ userCollection.userName }}</p>
          <p>{{ userCollection.fullName }}</p>
          <p>{{ userCollection.email }}</p>
        </div>
        <div v-if="editing === true" class="editing-information">
          <input type="text" v-model="userCollection.userName" />
          <input type="text" v-model="userCollection.fullName" />
        </div>
        <div class="buttons">
          <button v-if="editing === true" @click="onSave">save</button>
          <button v-if="editing === false" @click="onEdit">edit</button>
          <button v-if="editing === true" @click="onCancel">cancel</button>
        </div>
      </div>
    </div>
  </div>
  <div class="column-container">
    <div class="list-column">
      <select @change="selectProjectName" class="project-select">
        <option>Select a project</option>
        <option v-for="projects in this.arrayOfProjectNames" :key="projects.id">
          {{ projects.id }}
        </option>
      </select>
      <h3 v-if="projectInfo">Your tasks</h3>
      <ul v-if="projectInfo">
        <li v-for="item in allInfoUser" :key="item.id">
          <div
            class="sprint-card"
            :id="item.uuid"
            :style="{ borderColor: item.color }"
          >
            <div class="PBI-div">
              <p>{{ item.PBI }}</p>
            </div>
            <p class="task-name">
              {{ item.name }}
            </p>
            <section class="select-user">
              <p class="time-stamp">
                {{ item.time }}
              </p>

              <div class="card-owners">
                <p v-for="person in item.taskOwner.owner" :key="person.id">
                  {{ person }}
                </p>
              </div>
            </section>
          </div>
        </li>
      </ul>
    </div>
    <div class="chart-column">
      <ChartComponent
        v-if="!chartReload"
        :project-value="chartNumber"
        :task-value="personalTaskString"
        :status-value="statusArray"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .profile-card {
    font-family: Roboto, sans-serif;
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(255, 255, 255, 0.31);
    width: 80%;
    margin: 0 10%;
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
    padding-bottom: 20px;
    margin-bottom: 40px;
    .information-container {
      width: 80%;
      margin: 0 10%;
      display: flex;
      flex-wrap: wrap;
    }
    h1 {
      text-align: center;
      width: 60%;
      margin-left: 20%;
      margin-top: 2rem;
    }
    button {
      background-color: transparent;
      color: white;
      height: 2rem;
      width: 2rem;
      margin-right: 2rem;
      margin-top: 1rem;
    }
    .buttons {
      display: flex;
      width: 100%;
      text-align: center;
      // margin-left: auto;
      // margin-right: 5px;
      button {
        padding: 0;
        margin: 0;
        height: 20px;
        width: 20px;
        margin-left: 10px;
      }
    }
    .img-container {
      display: flex;
      max-width: 200px;
      height: 200px;
      justify-content: center;
      text-align: center;
      margin: auto;
      flex-wrap: wrap;
      .upload-buttons {
        background-color: rgba(0, 0, 0, 0.2);
        height: 15rem;
        width: 15rem;
        margin-top: 7.5px;
        border-radius: 7.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        .edit-button {
          width: 150px;
          padding-left: 7px;
          background-color: transparent;
        }
      }
    }
    .card-body {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10%;

      .saved-information {
        width: 20rem;
        margin-top: 1.8px;
        gap: 10px;
        flex-direction: column;
        p {
          height: 20px;
          font-size: 1rem;
          background-color: transparent;
          border-bottom: 2px solid rgba(255, 255, 255, 0);
          color: white;
          margin: 0;
          padding: 0;
          margin-left: 10px;
        }
      }
      .editing-information {
        width: 20rem;
        gap: 10px;
        flex-direction: column;
        input {
          height: 20px;
          width: 20rem;
          font-size: 1rem;
          background-color: transparent;
          border-bottom: 2px solid white;
          width: 80%;
          color: white;
          margin: 0;
          padding: 0;
          margin-left: 10px;
        }
        ::placeholder {
          color: white;
        }
      }
    }
  }
  .column-container {
    display: flex;
    flex-wrap: wrap;
    margin: 0 10%;
    background-color: rgba(255, 255, 255, 0.31);
    border-radius: 10px;
    padding: 10px;
  }
  .project-select {
    font-size: 1.2rem;
    padding: 1rem;
    border-radius: 10px;
    width: 100%;
  }
  .list-column {
    width: 33%;
    h3 {
      color: white;
      text-align: center;
      margin: 10px;
    }
  }
  .chart-column {
    width: 67%;
  }
  ul {
    background-color: rgba(255, 255, 255, 0.31);
    border-radius: 10px;
    padding: 4%;
    overflow: scroll;
    height: 500px;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  ul::-webkit-scrollbar {
    display: none;
  }
  li {
    list-style: none;
    margin-bottom: 10px;
  }
  .PBI-div {
    border-bottom: 1px solid rgba(0, 0, 0, 0.144);
    p {
      margin-top: 1.9rem;
      font-weight: 800;
    }
  }

  .sprint-card {
    border: 5px solid;
    background: #fff;
    border-radius: 10px;
  }

  .card-owners {
    display: flex;
    flex-wrap: wrap;
    p {
      margin: 3px;
      cursor: pointer;
    }
  }

  .select-user {
    border-top: 1px solid rgba(0, 0, 0, 0.144);
    padding: 2px 2px;
  }

  .time-stamp {
    font-size: 1.2rem;
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
  img {
    width: 150px;
    height: 150px;
    border-radius: 75px;
    margin: 5%;
    object-fit: cover;
    box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.2),
      0 16px 44px 0 rgba(0, 0, 0, 0.19);
  }

  @media screen and (max-width: 500px) {
    .list-column {
      width: 100%;
    }
    .chart-column {
      width: 100%;
    }
    .saved-information {
      p {
        width: 60%;
        overflow: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      p::-webkit-scrollbar {
        display: none;
      }
    }
  }
  @media screen and (max-width: 400px) {
    .saved-information {
      p {
        width: 50%;
      }
    }
    img {
      width: 130px;
      height: 130px;
      border-radius: 65px;
      margin: 5%;
      object-fit: cover;
    }
  }

  @media screen and (max-width: 300px) {
    .saved-information {
      p {
        width: 40%;
      }
    }
    img {
      width: 110px;
      height: 110px;
      border-radius: 55px;
      margin: 5%;
      object-fit: cover;
    }
  }
</style>
