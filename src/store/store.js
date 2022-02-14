import { createStore } from 'vuex'
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
  loggedInUser: null
}

export default createStore({ state, strict: true })
