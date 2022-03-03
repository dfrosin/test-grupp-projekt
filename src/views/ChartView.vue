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
      },
      projectValue: {
        type: String,
        default: ''
      }
    },
    mounted() {
      this.getAllProjectNames()
    },
    methods: {
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
  <div class="column-container">
    <div class="list-column">
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
  .column-container {
    display: flex;
    flex-wrap: wrap;
    margin: 0 5%;
  }
  .project-select {
    font-size: 1.2rem;
    padding: 1rem;
    border-radius: 10px;
    margin-left: 4rem;
  }
  .list-column {
    width: 33%;
  }
  .chart-column {
    width: 67%;
  }
  ul {
    margin-top: 30px;
    background-color: rgba(235, 235, 235, 0.3);
    border-radius: 10px;
    padding: 2%;
    padding: 10px;
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
</style>
