<script>
  import ChartComponent from '../components/ChartComponent.vue'
  import {
    where,
    limit,
    getDocs,
    query,
    doc,
    getDoc,
    collection
  } from 'firebase/firestore'
  import { firestore } from '../firebase.js'

  export default {
    data() {
      return {
        arrayOfProjectNames: [],
        projectInfo: '',
        arrayOfTasks: [],
        anotherArray: [],
        allInfoUser: [],
        pieChartArray: [],
        personalPieChartArray: [],
        personalTaskArray: [],
        statusArray: []
      }
    },
    components: {
      ChartComponent
    },
    props: {
      pieChartValue: {
        type: [String, Object, Number, Array],
        default: ''
      },
      statusValue: {
        type: [String, Object, Number, Array],
        default: ''
      },
      taskValue: {
        type: [String, Object, Number, Array],
        default: ''
      }
    },
    mounted() {
      this.getAllProjectNames()
    },
    methods: {
      filterSearch() {
        this.anotherArray.forEach((e) => {
          if (e.taskOwner) {
            if (
              e.taskOwner.owner.includes(
                this.$store.state.loggedInUser.userName
              )
            ) {
              this.allInfoUser.push(e)
            }
          }
        })
      },
      getDatabase() {
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
          for (let n = 0; n < this.projectInfo.status.length; n++) {
            // statusnamn utifrån array
            let statusTitle = this.projectInfo.status[n]
            let tasks = this.arrayOfTasks.filter((el) => {
              return el.status === statusTitle
            })
            let dynamicObject = {
              title: statusTitle,
              cards: tasks
            }
            this.pieChartArray.push(dynamicObject)
          }
          for (let n = 0; n < this.projectInfo.status.length; n++) {
            // statusnamn utifrån array
            let statusTitle = this.projectInfo.status[n]
            let tasks = this.allInfoUser.filter((el) => {
              return el.status === statusTitle
            })
            let dynamicObject = {
              title: statusTitle,
              cards: tasks
            }
            this.personalTaskArray.push(tasks.length)
            this.statusArray.push(statusTitle)
            this.personalPieChartArray.push(dynamicObject)
          }
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
  <select @change="selectProjectName" class="project-select">
    <option>Select a project</option>
    <option v-for="projects in this.arrayOfProjectNames" :key="projects.id">
      {{ projects.id }}
    </option>
  </select>

  <ul v-if="allInfoUser">
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

  <ChartComponent />
</template>

<style lang="scss" scoped>
  .project-select {
    font-size: 1.2rem;
    padding: 1rem;
    border-radius: 10px;
    margin-left: 4rem;
  }
  li {
    list-style: none;
    width: 40%;
    background-color: rgba(235, 235, 235, 0.3);
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
    width: 33%;
    background: #fff;
    border-radius: 10px;
    margin-top: 5%;
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
</style>
