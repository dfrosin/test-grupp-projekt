import { createStore } from 'vuex'
import { db, firestore } from '../firebase'
import { collection, getDocs, getDoc, setDoc, doc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { auth } from '../firebase'

const state = {
  pbItem: '',
  pbHeading: '',
  backlogItemInfo: {},
  deletedArray: [],
  arrayOfObjects: [],
  isDeleted: false,
  editMode: false,
  isVisible: true,
  showToolTip: false,
  newName: '',
  editProjectName: false,
  sprintGoal: null,
  todo: [
    { name: 'kalle', age: 21 },
    { name: 'urban', age: 25 }
  ],
  loggedInUser: null,
  projectName: null,
  taskColor: null,
  arrayOfTasks: null,
  projectUser: null,
  noOneInvited: true
}

const getters = {
  allTodos: (state) => state.todo
}

const mutations = {
  // syncrous way to update  state in vuex store
  setCreateList(state, payload) {
    state.backlogItemInfo = payload
  },

  setLoggedInUser(state, user) {
    state.loggedInUser = user
  },
  setProjectName(state, name) {
    state.projectName = name
  },
  //Denna är till för PBI
  setArrayOfObjects(state, array) {
    state.arrayOfObjects = array
  },
  setArrayOfTasks(state, array) {
    state.arrayOfTasks = array
  },
  setSprintGoal(state, goal) {
    state.sprintGoal = goal
  },
  setColor(state, color) {
    state.taskColor = color
  },
  setArrayOfUsers(state, user) {
    state.projectUser = user
  },
  switchBetweenStatus(state, status) {
    state.noOneInvited = status
  }
}

/* const getters = {
  getbackloggItemInfo() {
    return state.backlogItemInfo
  }
} */

const actions = {
  createList({ commit }) {
    this.backlogItemInfo.id = this.pbItem
    this.backlogItemInfo.docId = uuidv4()
    let copiedObject = JSON.parse(JSON.stringify(this.backlogItemInfo))
    const update = this.arrayOfObjects.push(copiedObject)
    this.pbItem = ''
    commit('setCreateList', update)
  },

  async init_login({ dispatch }) {
    const user = auth.currentUser //firebase lagrar denna info i webbläsaren, i localstorage
    if (user) {
      dispatch('fetchAndSetLoggedInUser', user)
    }
  },

  //hämtar ut det som ligger i users
  async fetchAndSetLoggedInUser({ commit }, user) {
    //hämtar ut det som ligger i users för det givna uid:t
    const userDoc = doc(firestore, `users/${user.uid}`)
    const userSnapshot = await getDoc(userDoc)
    if (userSnapshot.exists()) {
      const docData = userSnapshot.data()
      commit('setLoggedInUser', docData)
    }
  },

  // --------------- SKAPA NY ANVÄNDARE------------------------------ //
  createAccount({ commit }) {
    commit('setLoading', true)
    this.arrayOfObjects.forEach((allDocs) => {
      setTimeout(() => {
        const whereToAddData = doc(firestore, `PBI/${allDocs.id}`)
        setDoc(whereToAddData, allDocs)
      }, 2000)
    })
  },

  //Snapshot of all documents as Objects & Keys.
  getDatabase({ commit }) {
    commit('setLoading', true)
    const colRef = collection(db, 'PBI')

    getDocs(colRef).then((snapshot) => {
      let PBI = []
      snapshot.docs.forEach((doc) => {
        PBI.push({ ...doc.data(), id: doc.id })
      })
      this.arrayOfObjects = PBI
      console.log(PBI)
    })
  },

  deleteItem(e, { commit }) {
    commit('setLoading', true)
    this.deleted = true
    let deleteItemId = e.target.id
    var filtered = this.arrayOfObjects.filter(function (el) {
      return el.id != deleteItemId
    })
    this.arrayOfObjects = filtered
  },

  editName() {
    this.editProjectName = true
    this.isVisible = false
    /*  store.commit('setProjectName', this.pbHeading) */
  },
  visible() {
    this.isVisible = false
  },
  toolTipOpen() {
    this.showToolTip = true
  },
  toolTipClose() {
    this.showToolTip = false
  }
}

export default createStore({
  state,
  actions,
  mutations,
  getters,
  strict: true
})
