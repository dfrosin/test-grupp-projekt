import { createStore } from 'vuex'
import { db, firestore } from '../firebase'
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
/*  import { fs, db } from '..firebase/'


async addANewDocument() {
  const Newcollection = collection(firestore, 'Andreas')
  const newDoc = await addDoc(Newcollection, this.newUser)
  console.log(newDoc.path)
},

const mutations = {
    setLoggedInUser(state, user) {
      state.loggedInUser = user
    },
    adduser(state, User){
state.newUser
    }

  }, */

const state = {
  pbItem: '',
  pbHeading: '',
  backlogItemInfo: {
    id: '',
    docId: '',
    deleteId: ''
  },
  deletedArray: [],
  arrayOfObjects: [],
  isDeleted: false,
  editMode: false,
  isVisible: true,
  showToolTip: false,
  newName: '',
  editProjectName: false,
  todo: [
    { name: 'kalle', age: 21 },
    { name: 'urban', age: 25 }
  ],
  loggedInUser: null,
  projectName: null
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
  }
}

/* const getters = {
  getbackloggItemInfo() {
    return state.backlogItemInfo
  }
} */

const actions = {
  createList({ commit }) {
    commit('setLoading', true)
    this.backlogItemInfo.id = this.pbItem
    this.backlogItemInfo.docId = uuidv4()
    let copiedObject = JSON.parse(JSON.stringify(this.backlogItemInfo))
    const update = this.arrayOfObjects.push(copiedObject)
    this.pbItem = ''
    commit('setCreateList', update)
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

  /* editName() {
    this.editProjectName = true
    this.isVisible = false
    store.commit('setProjectName', this.pbHeading)
    console.log(store.state.projectName)
  }, */
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
